import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Calendar, Star } from "lucide-react";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-white">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-red-500">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Movie Details */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <img
          src={movie.image?.original || "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.name}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.name}</h1>

          {/* Rating + Year */}
          <div className="flex items-center gap-6 mb-4">
            {movie.rating?.average && (
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-medium">{movie.rating.average}</span>
              </div>
            )}
            {movie.premiered && (
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-5 h-5" />
                <span>{new Date(movie.premiered).getFullYear()}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          <div
            className="text-gray-300 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: movie.summary }}
          />

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre: string) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Official Site Button */}
          {movie.url && (
            <a
              href={movie.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Watch on TVMaze
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
