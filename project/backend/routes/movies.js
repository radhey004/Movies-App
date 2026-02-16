const express = require('express');
const { getPopularMovies, getTrendingMovies, searchMovies, getMovieById } = require('../controllers/moviesController');

const router = express.Router();

router.get('/popular', getPopularMovies);
router.get('/trending', getTrendingMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieById);

module.exports = router;