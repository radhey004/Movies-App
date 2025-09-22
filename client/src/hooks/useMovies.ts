import { useState } from 'react';
import { Movie } from '../types/Movie';

// Replace with actual API calls to your backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/movies/popular`);
      if (!response.ok) throw new Error('Failed to fetch popular movies');
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError("Failed to fetch popular movies");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/movies/trending`);
      if (!response.ok) throw new Error('Failed to fetch trending movies');
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError("Failed to fetch trending movies");
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/movies/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search movies');
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    fetchPopularMovies,
    fetchTrendingMovies,
    searchMovies,
  };
};