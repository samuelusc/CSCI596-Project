# CSCI596-Project：Graph Recommending Module

For the reommending system, the dataset can be download from:

- [Netflix Prize Dataset](https://www.kaggle.com/datasets/netflix-inc/netflix-prize-data)
The Netflix Prize dataset was a famous dataset released by Netflix for a competition to improve the accuracy of their movie recommendation system. <br>

- [TMDB 5000 Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata)
The "TMDB 5000" dataset refers to a collection of data from The Movie Database (TMDB), a popular, user-editable database for movies and TV shows.It includes a wide range of data such as titles, genres, release dates, budgets, revenues, production companies, countries, vote counts, and average vote scores.

**Test Instruction**
To evaluate our recommendation module, follow these steps:

- Download `recommender_graph.py` and the preprocessed datasets including out_genre.csv, out_grade.csv, out_keyword.csv, out_movies.csv, and out_productor.csv.
- Install `Neo4j` following the provided step-by-step installation instructions.
- Launch recommender_graph.py and establish a connection to the Neo4j database to start the testing process.

**Processing Larger Datasets**
To work with larger datasets:

- Download the datasets from Kaggle and TMDB 5000.
- Modify the MAX_USER parameter in `preGraph.py` according to your dataset size requirements to facilitate the processing of an extensive dataset.
