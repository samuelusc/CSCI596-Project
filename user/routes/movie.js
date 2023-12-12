const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movie');
const { isAuth } = require("../middlewares/auth");


router.get('/top-rated', async (req, res, next) => {
  try {
    const topMovies = await movieController.getTopMovies();
    res.json(topMovies);
  } catch (error) {
    next(error);
  }
});

router.get('/related/:movieTitle', movieController.getRelatedMovies);

router.get('/search-public', movieController.searchPublicMovies);

// router.get('/recommended-movies/:userId', isAuth, movieController.getRecommendedMovies);
router.get('/recommended-movies', isAuth, movieController.getRecommendedMovies);

module.exports = router; 
