from neo4j import GraphDatabase
import pandas as pd

# figurate dataset for the movie recommendation system
uri = "xxxx"
driver = GraphDatabase.driver(uri, auth=("neo4j", "xxx"))

# fundamental parameter configuration
k = 50
movies_common = 1
users_common = 2
threshold_sim = 0.7


def load_data():
    with driver.session() as session:
        session.run("""MATCH ()-[r]->() DELETE r""")
        session.run("""MATCH (r) DELETE r""")

        print("Loading movies...")

        session.run("""
            LOAD CSV WITH HEADERS FROM "file:///out_movies.csv" AS csv
            CREATE (:Movie {title: csv.title})
            """)

        print("Loading gradings...")

        session.run("""
            LOAD CSV WITH HEADERS FROM "file:///out_grade.csv" AS csv
            MERGE (m:Movie {title: csv.title}) 
            MERGE (u:User {id: toInteger(csv.user_id)})
            CREATE (u)-[:RATED {grading : toInteger(csv.grade)}]->(m)
            """)

        print("Loading genres...")

        session.run("""
            LOAD CSV WITH HEADERS FROM "file:///out_genre.csv" AS csv
            MERGE (m:Movie {title: csv.title})
            MERGE (g:Genre {genre: csv.genre})
            CREATE (m)-[:HAS_GENRE]->(g)
            """)

        print("Loading keywords...")

        session.run("""
            LOAD CSV WITH HEADERS FROM "file:///out_keyword.csv" AS csv
            MERGE (m:Movie {title: csv.title})
            MERGE (k:Keyword {keyword: csv.keyword})
            CREATE (m)-[:HAS_KEYWORD]->(k)
            """)

        print("Loading productors...")

        session.run("""
            LOAD CSV WITH HEADERS FROM "file:///out_productor.csv" AS csv
            MERGE (m:Movie {title: csv.title})
            MERGE (p:Productor {name: csv.productor})
            CREATE (m)-[:HAS_PRODUCTOR]->(p)
            """)


def queries():
    while True:
        userid = int(input("Input user: "))

        if not user_exists(userid):
            print(f"User ID {userid} not found. Adding new user.")
            add_new_user(userid)
            movie_ratings = []
            for _ in range(3):
                partial_title = input("Enter the movie title: ").lower()
                matching_movies = fuzzy_matching(partial_title)
                if not matching_movies:
                    print("No movies found. Try again.")
                    continue

                print("Matching movies:")
                for i, title in enumerate(matching_movies):
                    print(f"{i+1}: {title}")

                movie_index = int(input("Select the movie by number: ")) - 1
                if movie_index not in range(len(matching_movies)):
                    print("Invalid selection. Try again.")
                    continue

                while True:
                    try:
                        rating = int(input("Enter your rating (1-5): "))
                        if 1 <= rating <= 5:
                            break
                        else:
                            print("Rating must be between 1 and 5. Try again.")
                    except ValueError:
                        print("Invalid input. Please enter a number between 1 and 5.")

                movie_ratings.append((matching_movies[movie_index], rating))

            cold_start(userid, movie_ratings)
            continue

        m = int(input("Number of recommendations: "))

        genres = []
        if int(input("Filter by genre? ")):
            with driver.session() as session:
                try:
                    q = session.run(f"MATCH (g:Genre) RETURN g.genre AS genre")
                    result = [r["genre"] for r in q]
                    df = pd.DataFrame(result, columns=["genre"])
                    print(df)
                    inp = input("Select the genres by a list of indexes: ")
                    if inp:
                        genres = [df["genre"].iloc[int(x)]
                                  for x in inp.split(" ")]
                except Exception as e:
                    print(f"Error: {e}")

        with driver.session() as session:
            q = session.run(f"""
                    MATCH (u1:User {{id : {userid}}})-[r:RATED]-(m:Movie)
                    RETURN m.title AS title, r.grading AS grade
                    ORDER BY grade DESC
                    """)

            print()
            print("Your ratings are the following:")

            result = []
            for r in q:
                result.append([r["title"], r["grade"]])

            if len(result) == 0:
                print("No ratings found")
            else:
                df = pd.DataFrame(result, columns=["title", "grade"])
                print()
                print(df.to_string(index=False))
            print()

            session.run(f"""
                MATCH (u1:User)-[s:SIMILARITY]-(u2:User)
                DELETE s
                """)

            session.run(f"""
                MATCH (u1:User {{id : {userid}}})-[r1:RATED]-(m:Movie)-[r2:RATED]-(u2:User)
                WITH
                    u1, u2,
                    COUNT(m) AS movies_common,
                    SUM(r1.grading * r2.grading)/(SQRT(SUM(r1.grading^2)) * SQRT(SUM(r2.grading^2))) AS sim
                WHERE movies_common >= {movies_common} AND sim > {threshold_sim}
                MERGE (u1)-[s:SIMILARITY]-(u2)
                SET s.sim = sim
                """)

            Q_GENRE = ""
            if len(genres) > 0:
                Q_GENRE = "AND ((SIZE(gen) > 0) AND "
                Q_GENRE += "(ANY(x IN " + str(genres) + " WHERE x IN gen))"
                Q_GENRE += ")"

            q = session.run(f"""
                    MATCH (u1:User {{id : {userid}}})-[s:SIMILARITY]-(u2:User)
                    WITH u1, u2, s
                    ORDER BY s.sim DESC LIMIT {k}
                    MATCH (m:Movie)-[r:RATED]-(u2)
                    WHERE NOT((m)-[:RATED]-(u1))
                    WITH m.title AS title, COUNT(u2) AS num
                    WHERE num >= {users_common}
                    RETURN title
                    ORDER BY num DESC
                    LIMIT {m}
                    """)

            print("Recommended movies:")

            result = [record["title"] for record in q]
            if len(result) == 0:
                print("No recommendations found")
                print()
                continue
            for title in result:
                print(title)
            print()

        # print 5 most popular movies
            print("\nTop 5 Popular Movies:")
            top_movies = get_topmovies(session)
            for title, avg_grade in top_movies:
                print(f"{title}")
            print()

# if user has been existed


def user_exists(user_id):
    with driver.session() as session:
        result = session.run("""
            MATCH (u:User {id: $user_id})
            RETURN u
            """, user_id=user_id)
        return result.single() is not None

# create new user


def add_new_user(new_user_id):
    with driver.session() as session:
        session.run("""
            CREATE (u:User {id: $new_user_id})
            """, new_user_id=new_user_id)
        print(f"New user created with user ID {new_user_id}")

# after create new user id then rate 3 movies


def cold_start(new_user_id, movie_ratings):
    with driver.session() as session:
        # Create a new user
        session.run(f"""
            MERGE (u:User {{id: {new_user_id}}})
            """)

        # Add ratings for the new user
        for movie_title, rating in movie_ratings:
            # Escape single quotes in movie titles
            escaped_movie_title = movie_title.replace("'", "\\'")
            session.run(f"""
                MATCH (m:Movie {{title: '{escaped_movie_title}'}})
                MERGE (u:User {{id: {new_user_id}}})
                CREATE (u)-[:RATED {{grading: {rating}}}]->(m)
                """)
        print(f"Ratings added for user {new_user_id}")

# acquire 5 top movies


def get_topmovies(session, limit=5, min_ratings=20):
    result = session.run(f"""
        MATCH (m:Movie)<-[r:RATED]-()
        WITH m.title AS title, AVG(r.grading) AS avg_grade, COUNT(r) AS num_ratings
        WHERE num_ratings >= {min_ratings}
        RETURN title, avg_grade
        ORDER BY avg_grade DESC, num_ratings DESC
        LIMIT {limit}
    """)
    return [(record["title"], record["avg_grade"]) for record in result]


def fuzzy_matching(partial_title):
    with driver.session() as session:
        lower_partial_title = partial_title.lower()
        result = session.run(f"""
            MATCH (m:Movie)
            WHERE toLower(m.title) CONTAINS '{lower_partial_title}'
            RETURN m.title AS title
            """)
        return [record["title"] for record in result]


if __name__ == "__main__":
    if int(input("Load data? (1 for Yes, 0 for No): ")):
        load_data()
    queries()
