# Movie Recommendation System: 

### — Web App with Advanced Computing Method

## Introduction

The primary goal is to develop a robust Movie Recommendation System that provides users with personalized movie recommendation based on their previous movie rating and movie reference. The system will consist of a user-friendly frontend for interaction and a powerful backend for processing and generating recommendations.

## Dataset:

[Netflix Prize Dataset](https://www.kaggle.com/datasets/netflix-inc/netflix-prize-data): <br>
The Netflix Prize dataset was a famous dataset released by Netflix for a competition to improve the accuracy of their movie recommendation system. <br>

[MovieLens 20M Dataset](https://msnews.github.io/): <br>
The MovieLens Dataset is a collection of movie ratings provided by the GroupLens Research Project at the University of Minnesota. It's primarily used for research in collaborative filtering, machine learning, and data mining.<br>

## Modules and Contributors

We divided the project into four modules: 
- [Frontend](https://github.com/samuelusc/CSCI596-Project/tree/frontend-module) 
- [Backend](https://github.com/samuelusc/CSCI596-Project/tree/backend-module)
- [Dataset and web API](https://github.com/samuelusc/CSCI596-Project/tree/database-module)
- [Recommendation System](https://github.com/samuelusc/CSCI596-Project/tree/graphDB-1.0/recommending%20system)

Team members: Samuel Wang, Shengyi Liu, Rachel Huang, Zoey Zhang, Zitong Li, Guodong Sun

## Language and tools Used:

- **Frontend**: HTML/CSS/Javascript, React, Tailwind CSS <br>
- **Backend**: Python,Node.js with Express.js <br>
- **Database**:MongoDB, Graph Database, JSON Format <br>
- **Rcomendation System**: Neo4j Advanced Knowledge Graph, Collaborative Filtering, Cosine Similarity, Fuzzy Matching,  Scikit-learn(Old version)<br>

👉🏽 For this project, we will be using:

- [Final project description](https://github.com/samuelusc/CSCI596-Project/blob/main/Final.pdf)
- [Google Document](https://docs.google.com/document/d/1RiSPeehtdKsfRRoqi4PO4-cUTPvHlyLx88id9U7Svas)

## Product develpment feature map
<br>
<img width="725" alt="Product Development Feature Map" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/Web-Features.png">

## Table of Four modules

- [Recommender Module](#Recommender)
- [Frontend Module](#Frontend)
- [Backend Module](#Backend)
- [Databese Module](#Databases)

## Recommender
- `Latest Version`: [Neo4j Advanced Knwoledge Graph](https://github.com/samuelusc/CSCI596-Project/tree/graphDB-1.0/recommending%20system) <br>
- `Old Version`: [Scikit-surprise](https://github.com/samuelusc/CSCI596-Project/tree/2.0)

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

`Latest Version`:<br>

**`Pandas`**: For data handling and analysis.

**`Neo4j Database`**: Using Neo4j, a advanced graph database, to store and manage data. 

**`Dynamic Query Building`**: Constructs Cypher queries based on user input, such as filtering movies by genre or calculating similarity.

**`Cold Start Problem Handling`**: The user interacts with the system through the command line, inputting data and receiving recommendations.

**`Fuzzy Matching for Movie Titles`**: To handle partial or imprecise movie title inputs, the script employs a fuzzy matching technique. 

**`Cosine Similarity for User Similarity`**: Using Pearson Correlation Coefficient. The Pearson correlation coefficient is used to calculate the similarity between different movies. The movies are represented as vectors of pre-collected user review ratings. For each movie the correlation coefficients of the rating vector with vectors of other movies are collected and sorted. The recommneded movies are selected per largest correlation coefficients.

**`Collaborative Filtering for Recommendations`**: a user behavior-based collaborative filtering recommendation system, specifically for movie recommendations. This system identifies movies to recommend by analyzing user ratings, finding users with similar movie rating habits, and basing suggestions on the preferences of these similar users.

***
`Old Version`:<br>

**`Scikit-surprise or scikit-learn`**:
A python scikit we used to build and analyze recommender systems. It provides some efficient collaborative filtering algorithms, including user-based collaborative filtering, item-based collaborative filtering, and matrix factorization algorithms.

**`SVD (Singular Value Decomposition / matrix factorization )`**:
It’s a powerful matrix factorization technique used for collaborative filtering. This algorithm identifies latent features by decomposing the user-item rating matrix.


### Movie Recommendation System Flowchart:

<br>
<img width="725" alt="flowchart-recommender module traning" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/system%20recommendation-drawio.png">

### The matrix factorization illustration:

(Matrix image sourced from Buomsoo-kim)
<img width="725" alt="matrix picture" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/matrix-Buomsoo%20Kim.jpg">

**`Method`**:
A movie matrix is assembled based on collected data. Each column of the matrix represents the review pattern of all reviewers of a certain movie. For each column, the correlation coefficients are calculated with all other columns and the columns with highest coefficients are recorded and the movies represented by these columns shall be taken as recommended movie.

<img width="725" alt="matrix formular" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/formular-picture.png">

- User Matrix： X = (x1, x2, x3…, xn)
- Item matrix： Y = (y1, y2, y3…, ym)

**`Expected Outcomes`**:

- **Personalized Picks**: Suggesting 5 movies tailored to individual user preferences.
- **Related Discoveries**: Presenting 4 related movies based on user input, using advanced filtering methods.
- **Trending Now**: Showcasing the top 3 trending movies to keep users engaged with popular content.

**`Part of Output Test`**
The interactive interfaces are used for user to input any movies for recommendation. The fuzzywuzzy module is used to map user input to one of the movies in MovieMat, and then the interactive interface shows the recommended movies. A sample input/output result is shown as below.

<img width="725" alt="Relevance Recommendation" src="https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/result-matrix.png">

### Evaluation metrics:
`Old Version`
- **`MSE`**:  The average squared difference between the predicted and actual values.
- **`RMSE`**: Taking the square root of the mean squared error (MSE).
- **`Precision`** :  True Positive / (True Positive + False Positive)
- **`Recall`**: True Positive / (True Positive + False Negative) <br>

### Latest Demo
**Create New User 999111**
![Graph_recommender_demo1](https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/graph-recommender-1.jpg)<br>
**Cold Star For New User**
![Graph_recommender_demo2](https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/graph-recommender-2.jpg)<br>
**Graph Representation For User 999111**
![Graph_recommender_demo2](https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/user-similarity.jpg)

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

Testing with Postman

Create User:

<img width="725" alt="Screenshot 2023-11-23 at 5 18 41 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/bfc37821-83e4-44ca-b4b7-eaa1d96a9624">

Mailtrap—Email Verification:

<img width="540" alt="Screenshot 2023-11-23 at 5 19 16 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/0de568a2-119a-4507-b0ba-c0860f9c2921">

Get User ID from MongoDB:

<img width="583" alt="Screenshot 2023-11-23 at 5 20 15 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/8add2058-08c6-4f64-ab83-a79ceb5e02ed">

Email Verification:

<img width="638" alt="Screenshot 2023-11-23 at 5 20 26 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/762c6774-31d8-4cec-a55d-645ba8831f9d">

Get List of Top Rated Movies:

<img width="953" alt="Screenshot 2023-12-12 at 7 44 20 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/d060fba9-b77c-4047-9e11-bc16ed767fb9">

Get List of Related Movies based on a Movie Title:

<img width="956" alt="Screenshot 2023-12-12 at 7 44 42 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/3a40d78d-e8cc-4434-8fe3-fde457805cf6">

Get Movie Rating:

<img width="887" alt="Screenshot 2023-12-12 at 7 44 53 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/44de1d47-2d5b-4e56-806e-10fd3fd257c9">

Get Search Engine Results:

<img width="948" alt="Screenshot 2023-12-12 at 7 45 09 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/a74a7b0a-9940-4a88-8e75-088290ce4a6c">

Get List of Movie Recommendation for a User:

<img width="942" alt="Screenshot 2023-12-12 at 7 45 21 PM" src="https://github.com/samuelusc/CSCI596-Project/assets/35712263/5cc3eb39-77c4-4697-b762-f61e05be2f20">


### Database used

- MongoDB
- Neo4j Graph Database

### Things Stored in Database

* User information
* Movie reviews
* Pre-trained result for movie recommendation

### Movie Detail API

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
### Database presentation
**Present graph database**
![graph_database_presentation](https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/graph-database-1.jpg)<br>
**Present relationship network by movie keywords**
![graph_database_keyword_presentation](https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/graph-database-keywords.jpg)<br>
**Present relationship network by movie productors**
![graph_database_productor](https://github.com/samuelusc/CSCI596-Project/blob/recommender-module/recommending%20system/assets/graph-database-productor.jpg)<br>


## Final Demo:
### Home page
![Home_wo_login](https://github.com/samuelusc/CSCI596-Project/assets/142550022/35aad9bf-f5d9-4bef-8a6b-39e982c80c88)
### Sign up
![Sign_up](https://github.com/samuelusc/CSCI596-Project/assets/142550022/2e319e95-ea8e-4b3c-8c96-a65e41739d29)
### Search result
The result after we input "iron man".
![Search_result](https://github.com/samuelusc/CSCI596-Project/assets/142550022/e519a95c-3183-44f2-ad6e-83f78d7e5b76)
### Single movie page
We can see the related movies provided by recommendation system.
![Single_movie](https://github.com/samuelusc/CSCI596-Project/assets/142550022/91ebecb5-5dd3-415b-a6c9-3b01dbe861dc)
### Rate movie
![Rate_movie](https://github.com/samuelusc/CSCI596-Project/assets/142550022/7e1bc7ff-72d8-4dda-a00b-b1bf857d7afb)
### Recommended movies
We rated Iron Man 3, Iron Man 2 and The Avengers 5 stars. The recommendation system gave us other related sci-fi movies.
![Recommendation](https://github.com/samuelusc/CSCI596-Project/assets/142550022/c4a7de56-1552-4b49-8e91-8fa716fabe1f)


