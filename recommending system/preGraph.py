import pandas as pd
import json
import re


def Netflix(MAX_USER=5000):
    d_movie = dict()
    s_movie = set()

    out_movies = open('out_movies.csv', 'w')
    out_movies.write('title\n')

    for line in open('movie_titles.csv', 'r', encoding='ISO-8859-1'):
        line = line.strip().split(',')
        movie_id = int(line[0])
        title = line[2].replace("\"", "")
        title = "\"" + title + "\""

        d_movie[movie_id] = title

        if title in s_movie:
            continue
        s_movie.add(title)

        out_movies.write(f"{title}\n")

    out_movies.close()

    out_grade = open('out_grade.csv', 'w')
    out_grade.write('user_id,title,grade\n')

    files = ["combined_data_1.txt"]
    for f in files:
        movie_id = -1
        for line in open(f, 'r'):
            pos = line.find(':')
            if pos != -1:
                movie_id = int(line[:pos])
                continue
            line = line.strip().split(',')
            user_id = int(line[0])
            rating = int(line[1])

            if user_id > MAX_USER:
                continue

            out_grade.write(f"{user_id},{d_movie[movie_id]},{rating}\n")

    out_grade.close()


def TMDB():
    # below will occur error
    # pattern = re.compile('[A-Za-z0-9]+')
    pattern = re.compile('[A-Za-z0-9\s\.\,\!\?\'\"\-\_\(\)\&\#]+')

    out_genre = open('out_genre.csv', 'w')
    out_genre.write('title,genre\n')
    out_keyword = open('out_keyword.csv', 'w')
    out_keyword.write('title,keyword\n')
    out_productor = open('out_productor.csv', 'w')
    out_productor.write('title,productor\n')

    df = pd.read_csv('tmdb_5000_movies.csv', encoding='utf-8')
    # test if only keep english title movies
    df = df[df['original_title'].str.contains(
        "^[A-Za-z0-9\s\.,!?'\"\-\_\(\)&#]+$", regex=True, na=False)]

    # test
    json_columns = ['genres', 'keywords', 'production_companies']

    def convert_to_json(x):
        try:
            return json.loads(x)
        except Exception as e:
            print(f"Error converting to JSON: {x}")
            print(e)
            return None

    for column in json_columns:
        df[column] = df[column].apply(convert_to_json)

    for _, row in df.iterrows():
        title = row["original_title"]
        if not pattern.fullmatch(title):
            continue
        title = "\"" + title + "\""
        for g in row['genres']:
            genre = g['name']
            genre = "\"" + genre + "\""
            out_genre.write(f"{title},{genre}\n")
        for g in row['keywords']:
            keyword = g['name']

            keyword = "\"" + keyword.replace("\"", "") + "\""
            out_keyword.write(f"{title},{keyword}\n")
        for g in row['production_companies']:
            productor = g['name']

            productor = "\"" + productor.replace("\"", "") + "\""
            out_productor.write(f"{title},{productor}\n")


if __name__ == "__main__":
    Netflix()
    TMDB()
