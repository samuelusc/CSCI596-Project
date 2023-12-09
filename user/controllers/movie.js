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


module.exports = {
    getTopMovies,
    getRelatedMovies,
    searchPublicMovies,
};
