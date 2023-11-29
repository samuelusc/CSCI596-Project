# Movie Recommendation System: 

### — Web App with Advanced Computing Method

## Introduction

The primary goal is to develop a robust Movie Recommendation System that provides users with personalized movie recommendation based on their previous movie rating and movie reference. The system will consist of a user-friendly frontend for interaction and a powerful backend for processing and generating recommendations.

## Dataset:

[MovieLens 20M Dataset](https://msnews.github.io/): <br>
The MovieLens Dataset is a collection of movie ratings provided by the GroupLens Research Project at the University of Minnesota. It's primarily used for research in collaborative filtering, machine learning, and data mining.<br>
[Netflix Prize Dataset](https://www.kaggle.com/datasets/netflix-inc/netflix-prize-data): <br>
The Netflix Prize dataset was a famous dataset released by Netflix for a competition to improve the accuracy of their movie recommendation system.

## Language and tools Used:

- **Frontend**: HTML/CSS/Javascript, React, Tailwind CSS <br>
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

**`Relevance`**:
Offer movie recommendations as closely aligned as possible with user preferences and needs.

**`Novelty`**:
Suggest films that users might not have encountered but are likely to find intriguing.

**`Serendipity`**:
Ensure that our recommendations exceed user expectations, creating a sense of surprise and delight.

**`Diversity`**:
Provide a diverse range of recommended genres to cater to the varied tastes and requirements of our users.

<img width="725" alt="Four strategies" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/four_strategies.png">

### Measures and Features

**`Personalized Recommendations`**:
Utilizing machine learning algorithms, we provide individualized suggestions based on a user's search history, viewing history, and rating data.

**`New User Questionnaire`**:
New users are asked to complete a brief interest survey or rate movies during registration, which will allow us to quickly understand their preferences.

**`Interactive Interface`**:
An intuitive and user-friendly interface is designed to make it easier for users to discover and explore new movies.

**`Intelligent Sorting`**:
Movies are sorted to prominently display those that are likely to align with a user's tastes.

**`Editor's Picks`**:
We showcase a list of movies recommended by editors or based on popular trends.

**`Tagging System`**:
Movies are categorized using tags such as genre, mood, director, or actors, enabling users to swiftly filter according to their interests.

**`User Reviews`**:
Displaying other users' ratings and reviews helps new users discover popular movies.

### Possible Tech Stacks

**`Scikit-surprise or scikit-learn`**:
A python scikit we used to build and analyze recommender systems. It provides some efficient collaborative filtering algorithms, including user-based collaborative filtering, item-based collaborative filtering, and matrix factorization algorithms.

**`SVD (Singular Value Decomposition / matrix factorization )`**:
It’s a powerful matrix factorization technique used for collaborative filtering. This algorithm identifies latent features by decomposing the user-item rating matrix.

**`Similarity Calculation`**:
Using Pearson Correlation Coefficient. The Pearson correlation coefficient is used to calculate the similarity between different movies. The movies are represented as vectors of pre-collected user review ratings. For each movie the correlation coefficients of the rating vector with vectors of other movies are collected and sorted. The recommneded movies are selected per largest correlation coefficients.

**`DeepFM`** :
DNN (Deep Neural Networks) is a nonlinear model capable of capturing more complex relationships. FM (Factorization Machines) is a linear model that models implicit relationships between users and items through feature crossing.

**`Apache Spark`**:
For data processing and model training, Apache Spark can efficiently handle large datasets with its distributed computing capabilities, and using Spark's machine learning library (MLib) to build and train recommendation models.

**`Fuzzywuzzy`**:
Used for text matching and similarity calculations.

**`Pandas`**:
For data handling and analysis.

### Movie Recommendation System Flowchart:

<br>
<img width="725" alt="flowchart-recommender module traning" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/system%20recommendation-drawio.png">

### The matrix factorization illustration:

(Matrix image sourced from Buomsoo-kim)
`<img width="725" alt="matrix picture" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/matrix-Buomsoo%20Kim.jpg">`

**`Method`**:
A movie matrix is assembled based on collected data. Each column of the matrix represents the review pattern of all reviewers of a certain movie. For each column, the correlation coefficients are calculated with all other columns and the columns with highest coefficients are recorded and the movies represented by these columns shall be taken as recommended movie.

<img width="725" alt="matrix formular" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/formular-picture.png">

- User Matrix： X = (x1, x2, x3…, xn)
- Item matrix： Y = (y1, y2, y3…, ym)

**`Expected Outcomes`**:

- **Personalized** Picks: Suggesting 5 movies tailored to individual user preferences.
- **Related Discoveries**: Presenting 4 related movies based on user input, using advanced filtering methods.
- **Trending Now**: Showcasing the top 3 trending movies to keep users engaged with popular content.

**`Part of Output Test`**
The interactive interfaces are used for user to input any movies for recommendation. The fuzzywuzzy module is used to map user input to one of the movies in MovieMat, and then the interactive interface shows the recommended movies. A sample input/output result is shown as below.

<img width="725" alt="Relevance Recommendation" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/result-matrix.png">

### Evaluation metrics:

- **`MSE`**:  The average squared difference between the predicted and actual values.
- **`RMSE`**: Taking the square root of the mean squared error (MSE).
- **`Precision`** :  True Positive / (True Positive + False Positive)
- **`Recall`**: True Positive / (True Positive + False Negative) <br>

**Expected value**: Our goal is to achieve an RMSE value between `0.5 to 0.85`, aiming to surpass industry benchmarks. Notably, the best-performing algorithm in the Netflix Prize challenge achieved an RMSE of approximately `0.85`.

## Frontend

Description:
The frontend mainly includes the following pages:

- User Sign In/Sign Up/Forget Password
- Home page displaying top rated movies, recommended movies and providing searching functionality
- Single movie page displaying the basic information of the movie, review(0-5 stars) and related movies

Tech Stacks:

- React.js
- Tailwind CSS

Preview:
![image9](https://github.com/samuelusc/CSCI596-Project/assets/142550022/6b3801b3-61c8-4b7b-ac9f-487c04d5895b)
![image2](https://github.com/samuelusc/CSCI596-Project/assets/142550022/dc70d4db-293c-4a15-8771-3e45c1bcd55a)
![image6](https://github.com/samuelusc/CSCI596-Project/assets/142550022/d07cc236-f218-4aad-8ef6-cc276dc2330e)

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

## Databases and Movie Detail API

### Database used

MongoDB

### Things Stored in Database

* User information
* Movie reviews
* Pre-trained result for movie recommendation

### Movie Detail API:

Request movie details (movie title, movie overview, movie poster, etc.) from [TMDB](https://www.themoviedb.org/).

#### Example Response

```json
{
  adult: false,
  backdrop_path: '/bckxSN9ueOgm0gJpVJmPQrecWul.jpg',
  genre_ids: [ 28, 12, 14 ],
  id: 572802,
  original_language: 'en',
  original_title: 'Aquaman and the Lost Kingdom',
  overview: "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
  popularity: 253.712,
  poster_path: '/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg',
  release_date: '2023-12-20',
  title: 'Aquaman and the Lost Kingdom',
  video: false,
  vote_average: 0,
  vote_count: 0
}
```
