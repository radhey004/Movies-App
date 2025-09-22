import React from "react";
import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";  // 👈 import Link
import { Movie } from "../types/Movie";
import { getImageUrl } from "../utils/api";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>   {/* 👈 navigate to details page */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/20 border border-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer"
      >
        <div className="relative">
          <img
            src={movie.image ? movie.image.medium : getImageUrl(null)}
            alt={movie.name}
            className="w-full h-64 sm:h-80 object-cover"
          />
          {movie.rating?.average && (
            <div className="absolute top-3 right-3 bg-black bg-opacity-70 rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">
                {movie.rating.average.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 leading-tight">
            {movie.name}
          </h3>

          <div className="flex items-center gap-2 mb-3 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {movie.premiered ? new Date(movie.premiered).getFullYear() : "N/A"}
            </span>
          </div>

          <p
            className="text-gray-400 text-sm line-clamp-3 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: movie.summary || "No description available.",
            }}
          />
        </div>
      </motion.div>
    </Link>
  );
};

