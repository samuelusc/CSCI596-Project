const neo4j = require('neo4j-driver');

// Create a Neo4j driver instance
const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', '12345678')
);

// Execute the Neo4j query
async function getTopMovies(req, res) {
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (m:Movie)<-[r:RATED]-(:User)
            WITH m, AVG(r.grading) AS avgGrade, COUNT(r) AS ratingsCount
            WITH m, avgGrade, ratingsCount, (avgGrade * 0.7 + ratingsCount * 0.3) AS popularityScore
            ORDER BY popularityScore DESC
            LIMIT 5
            RETURN m.title AS Movie, avgGrade, ratingsCount, popularityScore
        `);

        return result.records.map(record => record.toObject());
    } finally {
        await session.close();
    }
}

async function getRelatedMovies(req, res) {
    const { movieTitle } = req.params;
  
    // Call the function to get related movies based on movieId
    const relatedMovies = await getRelatedMoviesFromNeo4j(movieTitle);
  
    res.json(relatedMovies);
}
  
  // Function to get related movies based on movieId
async function getRelatedMoviesFromNeo4j(movieTitle) {
    const session = driver.session();
  
    try {
        // Your Neo4j query to get related movies based on movieTitle
        const result = await session.run(`
        MATCH (m:Movie)-[:HAS_GENRE]->(g:Genre)<-[:HAS_GENRE]-(similar:Movie)
        WHERE m.title = $movieTitle
        RETURN similar.title AS SimilarMovie
        LIMIT 5
        `, { movieTitle });
  
        return result.records.map(record => record.toObject());
    } finally {
        await session.close();
    }
}
  
async function searchPublicMoviesFromNeo4j(movieTitle) {
    const session = driver.session();

    try {
        // Your Neo4j query to search for public movies based on the title
        const result = await session.run(`
            MATCH (m:Movie)<-[r:RATED]-(:User)
            WHERE m.title = $movieTitle
            RETURN m.title AS Movie, AVG(r.grading) AS AvgRating
        `, { movieTitle });

        return result.records.map(record => record.toObject());
    } finally {
        await session.close();
    }
}

// Express route to search for public movies
async function searchPublicMovies(req, res) {
    const { movieTitle } = req.query;

    try {
        // Call the function to search for public movies based on the title
        const publicMovies = await searchPublicMoviesFromNeo4j(movieTitle);

        res.json(publicMovies);
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function searchPublicMoviesFromNeo4j(partialTitle) {
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (m:Movie)
            WHERE toLower(m.title) CONTAINS toLower($partialTitle)
            RETURN m.title AS title
        `, { partialTitle });

        return result.records.map(record => record.toObject());
    } finally {
        await session.close();
    }
}


async function searchPublicMovies(req, res) {
    const { partialTitle } = req.query;

    // Call the function to search for public movies based on the partial title
    const publicMovies = await searchPublicMoviesFromNeo4j(partialTitle);

    res.json(publicMovies);
}

async function getRecommendedMoviesForUser(userId) {
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (u1:User {id: $userId})-[r1:RATED]-(m:Movie)-[r2:RATED]-(u2:User)
            WITH
                u1, u2,
                COUNT(m) AS movies_common,
                SUM(r1.grading * r2.grading)/(SQRT(SUM(r1.grading^2)) * SQRT(SUM(r2.grading^2))) AS sim
            WHERE movies_common >= 1 AND sim > 0.7
            MERGE (u1)-[s:SIMILARITY]-(u2)
            SET s.sim = sim
            
            WITH u1, u2, sim
            ORDER BY sim DESC
            LIMIT 50
            
            MATCH (m:Movie)-[r:RATED]-(u2)
            WHERE NOT((m)-[:RATED]-(u1))
            WITH m.title AS title, AVG(r.grading) AS avgRating, COUNT(u2) AS num, sim
            WHERE num >= 2
            WITH title, avgRating, num, sim
            ORDER BY num DESC
            RETURN COLLECT({ Movie: title, AvgRating: avgRating }) AS recommendedMovies, sim
            LIMIT 5;
        `, { userId });


        // Extract recommended movies from the result
        const recommendedMovies = result.records.map(record => {
            const recommendedMoviesArray = record.get('recommendedMovies');
        
            // Log the content of recommendedMoviesArray
            console.log('recommendedMoviesArray:', recommendedMoviesArray);
        
            // Extract 'Movie' and 'AvgRating' from each object in the array
            const movies = recommendedMoviesArray.map(movie => ({
                Movie: movie.Movie,
                AvgRating: movie.AvgRating,
            }));
        
            return {
                recommendedMovies: movies,
            };
        });

        return recommendedMovies;
    } finally {
        await session.close();
    }
}

// New Express route to get recommended movies for a user
async function getRecommendedMovies(req, res) {
    const userId = req.user.userId; 
    console.log(userId)

    try {
        // Call the function to get recommended movies for the user
        const recommendedMovies = await getRecommendedMoviesForUser(userId);

        res.json(recommendedMovies);
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getTopMovies,
    getRelatedMovies,
    searchPublicMovies,
    getRecommendedMovies,
};
