const axios = require('axios');
const Movie = require('../models/Movie');

// Fetch movies from TVmaze API
const fetchMoviesFromAPI = async (endpoint) => {
  try {
    const response = await axios.get(`https://api.tvmaze.com${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies from TVmaze API');
  }
};

// Get popular movies
const getPopularMovies = async (req, res) => {
  try {
    const movies = await fetchMoviesFromAPI('/shows?page=1');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trending movies
const getTrendingMovies = async (req, res) => {
  try {
    const movies = await fetchMoviesFromAPI('/shows?page=2');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search movies
const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    
    const results = await fetchMoviesFromAPI(`/search/shows?q=${q}`);
    const movies = results.map(item => item.show);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movie by ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await fetchMoviesFromAPI(`/shows/${id}`);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save movie to database (for favorites)
const saveMovie = async (movieData) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { id: movieData.id },
      movieData,
      { upsert: true, new: true }
    );
    return movie;
  } catch (error) {
    throw new Error('Failed to save movie to database');
  }
};

module.exports = {
  getPopularMovies,
  getTrendingMovies,
  searchMovies,
  getMovieById,
  saveMovie
};