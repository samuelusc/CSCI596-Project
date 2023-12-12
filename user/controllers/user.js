const jwt = require('jsonwebtoken')
const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const PasswordResetToken = require('../models/passwordResetToken');
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError, generateRandomByte} = require("../utils/helper");
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', '12345678')
);

exports.create = async(req, res) => {
    const {name, email, password} = req.body;

    const oldUser = await User.findOne({ email });
    if(oldUser) return sendError(res, "This email is already in use!");
    
    const movieRating = new Map([])
  
    const newUser = new User({name, email, password,movieRating});
    await newUser.save();

    let OTP = generateOTP();

    const newEmailVerificationToken  = new 
    EmailVerificationToken({
        owner: newUser._id, 
        token: OTP,
    });
    
    await newEmailVerificationToken.save()

    var transport = generateMailTransporter();

    transport.sendMail({
        from: "verfication@reviewapp.com",
        to: newUser.email,
        subject: "Email Verification",
        html: 
            `
            <p>Your verification OTP</p>
            <h1>${OTP}</h1>
            `  
        ,
    });

    res
        .status(201)
        .json({ 
            message: "Please verify your email. OTP has been sent to your email account!"
        });
};

exports.verifyEmail = async(req, res) => {
    const {userId, OTP} = req.body;

    if(!isValidObjectId(userId)) return res.json({error: "Invalid user!"});

    const user = await User.findById(userId)
    if(!user) return sendError(res, "user not found!", 404);

    if(user.isVerified) return sendError(res, "user is already verified!");

    const token = await EmailVerificationToken.findOne({ owner: userId });
    if(!token) return sendError(res, "token not found!");

    const isMatched = await token.compareToken(OTP)
    if(!isMatched) return sendError(res, "Please submit a valid OTP!");

    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id)


    var transport = generateMailTransporter();

    transport.sendMail({
        from: "verfication@reviewapp.com",
        to: user.email,
        subject: "Welcom Email",
        html: "<h1>Welcome to our app and thanks for choosing us.</h1>",
    });
    
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({user: { id: user._id, name: user.name, email: user.email, token: jwtToken }, message: "Your email is verified."})
};

exports.resendEmailVerificationToken = async (req, res) => {
    const { userId } = req.body;
  
    const user = await User.findById(userId);
    if (!user) return sendError(res, "user not found!"); 
  
    if (user.isVerified)
      return sendError(res, "This email id is already verified!");  
  
    const alreadyHasToken = await EmailVerificationToken.findOne({
      owner: userId,
    });
    if (alreadyHasToken)
      return sendError(res, "Only after one hour you can request for another token!");
  
    // generate 6 digit otp
    let OTP = generateOTP();
  
    // store otp inside our db
    const newEmailVerificationToken = new 
    EmailVerificationToken({ 
        owner: user._id, 
        token: OTP 
    })
  
    await newEmailVerificationToken.save()
  
    // send that otp to our user
  
    var transport = generateMailTransporter();
  
    transport.sendMail({
      from: 'verification@reviewapp.com',
      to: user.email,
      subject: 'Email Verification',
      html: `
        <p>You verification OTP</p>
        <h1>${OTP}</h1>
      `
    })
  
    res.json({
      message: "New OTP has been sent to your registered email accout.",
    });
  };


exports.forgetPassword = async(req, res) => {
    const {email} = req.body;

    if(!email) return sendError(res, "email is missing!");

    const user = await User.findOne({email})
    if(!user) return sendError(res, "User not found!", 404);

    const alreadyHasToken = await passwordResetToken.findOne({owner: user._id})

    if(alreadyHasToken) return sendError(res, "Only after one hour you can request for another token!");

    const token = await generateRandomByte();
    const newPasswordResetToken = await passwordResetToken({owner: user._id, token});
    await newPasswordResetToken.save();

    const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}` ;

    var transport = generateMailTransporter();

    transport.sendMail({
        from: "security@reviewapp.com",
        to: user.email,
        subject: "Reset Password Link",
        html: 
            `
            <p>Click here to reset password</p>
            <a href='${resetPasswordUrl}'>Change Password</a>
            `  
        ,
    });
    res.json({message: "Link sent to your email"});
};


exports.sendResetPasswordTokenStatus = (req, res) => {
    res.json({ valid: true })
}
  
exports.resetPassword = async (req, res) => {
    const { newPassword, userId } = req.body;

    const user = await User.findById(userId);
    const matched = await user.comparePassword(newPassword);
    if (matched)
        return sendError(
        res,
        "The new password must be different from the old one!"
        );

    user.password = newPassword;
    await user.save();

    await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

    const transport = generateMailTransporter();

    transport.sendMail({
        from: "security@reviewapp.com",
        to: user.email,
        subject: "Password Reset Successfully",
        html: `
        <h1>Password Reset Successfully</h1>
        <p>Now you can use new password.</p>

        `,
    });

    res.json({
        message: "Password reset successfully, now you can use new password.",
    });
}

exports.signIn = async (req, res,) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "Email/Password mismatch!");

    const matched = await user.comparePassword(password);
    if (!matched) return sendError(res, "Email/Password mismatch!");

    const { _id, name } = user;

    const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

    res.json({
        user: { id: _id, name, email, token: jwtToken, },
    });
};

// Function to save user data to Neo4j
async function saveUserDataToNeo4j(userId, movieRating) {


    const session = driver.session();

    try {
        // Neo4j query to create/update user and movie nodes
        const result = await session.run(`
            MERGE (u:User {id: $userId})

            WITH u, $movieTitles AS movieTitles, $ratings AS ratings
            UNWIND range(0, size(movieTitles) - 1) AS i
            MERGE (m:Movie {title: movieTitles[i]})
            MERGE (u)-[r:RATED]->(m)
            SET r.grading = ratings[i]

            RETURN u, ID(u) AS identity, labels(u) AS labels, properties(u) AS properties
        `, {
            userId,
            movieTitles: Array.from(movieRating.keys()),
            ratings: Array.from(movieRating.values())
        });

        console.log(result);

        return result; 
    } catch (error) {
        console.error("Neo4j query error:", error);
    } finally {
        await session.close();
    }
}

// Function to update user movie ratings
exports.updateUserMovieRatings = async (req, res) => {
    const userId = req.user.userId; 
    console.log(userId)

    const { movie, rating } = req.body;
    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return sendError(res, "User not found!", 404);
        }

        // Update the user's movie ratings
        user.movieRating.set(movie, rating);
        await user.save();

        // Check if there are 3 or more key-value pairs in the map
        if (user.movieRating.size >= 3) {
            // Call the function to save user data to Neo4j
            await saveUserDataToNeo4j(userId, user.movieRating);
        }

        res.json({
            message: `Movie rating for ${movie} updated successfully.`,
        });
    } catch (error) {
        sendError(res, "Error updating movie rating.", 500);
    }
}; 