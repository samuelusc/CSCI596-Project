# Movie Recommendation System: <br>
### — Web App with Advanced Computing Method

## Introduction
The primary goal is to develop a robust Movie Recommendation System that provides users with personalized movie recommendation based on their previous movie rating and movie reference. The system will consist of a user-friendly frontend for interaction and a powerful backend for processing and generating recommendations.

## Dataset:
[MovieLens 20M Dataset](https://msnews.github.io/): <br>
The MovieLens Dataset is a collection of movie ratings provided by the GroupLens Research Project at the University of Minnesota. It's primarily used for research in collaborative filtering, machine learning, and data mining.<br>
[Netflix Prize Dataset](https://www.kaggle.com/datasets/netflix-inc/netflix-prize-data): <br>
The Netflix Prize dataset was a famous dataset released by Netflix for a competition to improve the accuracy of their movie recommendation system.

## Language and tools Used:
- **Frontend**: HTML/CSS/Javascript, React <br>
- **Backend**: Python,Node.js with Express.js, JAVA <br>
- **Database**:MongoDB, JSON Format <br>
- **Machine Learning**: Python(Scikit-learn, scikit-learn), DeepFM <br>
- **Distributed Computing Frame**:  Apache Spark <br>
  
## Contributing and Team Member
Frontend: Shenyi Liu <br>
Backend: Rachel Huang <br>
Dataset and web crawler: Guodong Sun, Zitong Li <br>
Recommendation System: Samuel Wang, Zoey Zhang <br>

👉🏽 For this project, we will be using: 
- [Final project description](https://github.com/samuelusc/CSCI596-Project/blob/main/Final.pdf)
- [Google Document](https://docs.google.com/document/d/1RiSPeehtdKsfRRoqi4PO4-cUTPvHlyLx88id9U7Svas)

## Table of Four modules
- [Recommender Module](#Recommender)
- [Frontend Module](#Frontend)
- [backend Module](#Backend)
- [Dataset Module](#Database)

## Recommender
### Design Objects
Our recommendation module primarily aims to solve two main problems:<br>
1. How to enable new users to quickly discover movies they'll love.
2. How to effectively increase the engagement of our existing users.

### Four Core Strategies
`Relevance`: 
Offer movie recommendations as closely aligned as possible with user preferences and needs.

`Novelty`: 
Suggest films that users might not have encountered but are likely to find intriguing.

`Serendipity`: 
Ensure that our recommendations exceed user expectations, creating a sense of surprise and delight.

`Diversity`: 
Provide a diverse range of recommended genres to cater to the varied tastes and requirements of our users.

<img width="725" alt="Four strategies" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/four_strategies.png">

### Measures and Features 
`Personalized Recommendations`: 
Utilizing machine learning algorithms, we provide individualized suggestions based on a user's search history, viewing history, and rating data.

`New User Questionnaire`: 
New users are asked to complete a brief interest survey or rate movies during registration, which will allow us to quickly understand their preferences.

`Interactive Interface`: 
An intuitive and user-friendly interface is designed to make it easier for users to discover and explore new movies.

`Intelligent Sorting`: 
Movies are sorted to prominently display those that are likely to align with a user's tastes.

`Editor's Picks`: 
We showcase a list of movies recommended by editors or based on popular trends.
 
`Tagging System`: 
Movies are categorized using tags such as genre, mood, director, or actors, enabling users to swiftly filter according to their interests.
 
`User Reviews`: 
Displaying other users' ratings and reviews helps new users discover popular movies.


### Possible Tech Stacks
**Scikit-surprise or scikit-learn**: 
A python scikit we used to build and analyze recommender systems. It provides some efficient collaborative filtering algorithms, including user-based collaborative filtering, item-based collaborative filtering, and matrix factorization algorithms.
 
`SVD (Singular Value Decomposition / matrix factorization )`: 
It’s a powerful matrix factorization technique used for collaborative filtering. This algorithm identifies latent features by decomposing the user-item rating matrix.
 
`DeepFM` : 
DNN (Deep Neural Networks) is a nonlinear model capable of capturing more complex relationships. FM (Factorization Machines) is a linear model that models implicit relationships between users and items through feature crossing. 
 
`Apache Spark`: 
For data processing and model training, Apache Spark can efficiently handle large datasets with its distributed computing capabilities, and using Spark's machine learning library (MLib) to build and train recommendation models.
 
`Similarity Calculation`: 
Using Pearson Correlation Coefficient. The Pearson correlation coefficient is used to calculate the similarity between different movies.

`Fuzzywuzzy`: 
Used for text matching and similarity calculations.

`Pandas`: 
For data handling and analysis.


## Backend

Features:
- User sign up, user sign in, email verification, reset password
- Send movie information to the frontend (user ID, review, recommendation list, popular movie)
- Send search engine data to the frontend

Tech Stacks:
- Node.js
- Express.js

Testing with Postman—Create User:

<img width="725" alt="Screenshot 2023-11-23 at 5 18 41 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/bfc37821-83e4-44ca-b4b7-eaa1d96a9624">

Testing with Mailtrap—Email Verification:

<img width="540" alt="Screenshot 2023-11-23 at 5 19 16 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/0de568a2-119a-4507-b0ba-c0860f9c2921">

Get User ID from MongoDB:

<img width="583" alt="Screenshot 2023-11-23 at 5 20 15 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/8add2058-08c6-4f64-ab83-a79ceb5e02ed">

Testing with Postman—Verify Email:

<img width="638" alt="Screenshot 2023-11-23 at 5 20 26 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/762c6774-31d8-4cec-a55d-645ba8831f9d">





