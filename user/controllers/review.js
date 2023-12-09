const neo4j = require('neo4j-driver');

// Create a Neo4j driver instance
const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', '12345678')
);

async function getReviewsByMovieFromNeo4j(movieId) {
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (m:Movie)<-[r:RATED]-(:User)
            WHERE id(m) = toInteger($movieId)
            RETURN m.title AS Movie, AVG(r.grading) AS AvgRating
        `, { movieId });

        const records = result.records.map(record => record.toObject());

        if (records.length === 0) {
            return -1; // Return -1 if there are no reviews for the movie
        }

        return records;
    } finally {
        await session.close();
    }
}

async function getReviewsByMovie(req, res) {
    const { movieId } = req.params;

    // Call the function to get reviews for the specified movieId
    const reviews = await getReviewsByMovieFromNeo4j(movieId);

    if (reviews === -1) {
        return res.json({ message: "No reviews found for the specified movieId.", data: -1 });
    }

    res.json({ message: "Reviews retrieved successfully.", data: reviews });
}

module.exports = {
    getReviewsByMovie,
    // Add more functions as needed
};

