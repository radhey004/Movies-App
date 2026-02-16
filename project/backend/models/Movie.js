const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  summary: String,
  premiered: String,
  image: {
    medium: String,
    original: String
  },
  rating: {
    average: Number
  },
  genres: [String],
  language: String,
  status: String,
  runtime: Number,
  officialSite: String,
  imdbId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);