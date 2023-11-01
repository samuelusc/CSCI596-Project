import pandas as pd
# import necessary classes and function from surprise
from surprise import Reader, SVD, Dataset
from surprise.model_selection import train_test_split
# import random library for random movie recommendation
import random
# import warning library and ignore some of them
import warnings
warnings.filterwarnings('ignore')

# start preprocess data and train recommendation model


class MovieRecommender:
    def __init__(self, ratings_file, movies_file):
        self.ratings = pd.read_csv(ratings_file)
        self.movies = pd.read_csv(movies_file)
        self.preprocess_data()
        self.train_model()

# remove ratings less than 3
# filter users based on threshold and filter movies to include only those
# have been reated
    def preprocess_data(self):
        self.ratings = self.ratings.query('rating >= 3')
        self.ratings.reset_index(drop=True, inplace=True)
        # we set a threshold for the number of ratings per user
        n = 1000
        users = self.ratings.userId.value_counts()
        users = users[users > n].index.tolist()
        # filter ratings data to include only users with more than n rating
        self.ratings = self.ratings.query('userId in @users')

        rated_movies = self.ratings.movieId.tolist()
        self.movies = self.movies.query('movieId in @rated_movies')
        self.movies.set_index("movieId", inplace=True, drop=True)

# train model with specific scale and ultilize SVD algorithm
    def train_model(self):
        # scale from 0-5
        reader = Reader(rating_scale=(0, 5))
        data = Dataset.load_from_df(
            self.ratings[['userId', 'movieId', 'rating']], reader)
        # we split data into training and test case
        trainset, _ = train_test_split(data, test_size=0.25)
        self.algo = SVD()
        self.algo.fit(trainset)

# add the new user's data into our trainning model
    def new_user_recommendation(self, new_user_id, new_ratings, n=10):
        new_data = pd.DataFrame(new_ratings, columns=['movieId', 'rating'])
        new_data['userId'] = new_user_id
        new_ratings_data = pd.concat([self.ratings, new_data])

        reader = Reader(rating_scale=(0, 5))
        data = Dataset.load_from_df(
            new_ratings_data[['userId', 'movieId', 'rating']], reader)
        trainset = data.build_full_trainset()
        algo = SVD()
        algo.fit(trainset)

        movie_ids = self.movies.index.tolist()
        predicted_ratings = [(movie_id, algo.predict(
            new_user_id, movie_id).est) for movie_id in movie_ids]
        recommended_movies = sorted(
            predicted_ratings, key=lambda x: x[1], reverse=True)[:n]
        recommended_movie_ids = [x[0] for x in recommended_movies]
        return self.movies.loc[recommended_movie_ids]

# ask new user input valid rating for 5 movies
    def input_ratings(self):
        new_user_ratings = []
        random_movies = self.movies.sample(5)
        for movie_id in random_movies.index:
            movie_title = random_movies.loc[movie_id, 'title']
            while True:
                try:
                    rating = float(
                        input(f"Please rate movie '{movie_title}' (0 to 5): "))
                    if 0 <= rating <= 5:
                        break
                    else:
                        print("Rating must be between 0 and 5. Please try again.")
                except ValueError:
                    print("Invalid input. Please enter a number between 0 and 5.")
            new_user_ratings.append((movie_id, rating))
        return new_user_ratings


# generate 5 recommending movies for a new user
recommender = MovieRecommender('ratings.csv', 'movies.csv')
new_user_id = random.randint(10000, 99999)
new_ratings = recommender.input_ratings()
recommended_movies = recommender.new_user_recommendation(
    new_user_id, new_ratings, n=5)
print("\nRecommended Movies only for you: ")
for movie_id in recommended_movies.index:
    print(recommended_movies.loc[movie_id, 'title'])
