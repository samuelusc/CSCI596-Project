const express = require("express");
const router = express.Router();
const reviewController = require('../controllers/review');

router.get("/get-reviews-by-movie/:movieId", reviewController.getReviewsByMovie);

module.exports = router;