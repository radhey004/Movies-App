import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Star as StarIcon, Clock } from "lucide-react";
import { useMovies } from "../hooks/useMovies";
import { SearchBar } from "./SearchBar";
import { MovieCard } from "./MovieCard";

export const Dashboard = () => {
  const {
    movies,
    loading,
    error,
    fetchPopularMovies,
    fetchTrendingMovies,
    searchMovies,
  } = useMovies();

  const [activeTab, setActiveTab] = useState<
    "popular" | "trending" | "top_rated"
  >("popular");

  const tabs = [
    {
      id: "popular",
      label: "Popular",
      icon: <Clock className="w-4 h-4" />,
      action: fetchPopularMovies,
    },
    {
      id: "trending",
      label: "Trending",
      icon: <TrendingUp className="w-4 h-4" />,
      action: fetchTrendingMovies,
    },
    {
      id: "top_rated",
      label: "Top Rated",
      icon: <StarIcon className="w-4 h-4" />,
      action: fetchPopularMovies, // TVmaze doesn't have top rated, fallback to popular
    },
  ] as const;

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) tab.action();
  };

  // 🔹 Load popular shows by default when component mounts
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover <span className="text-red-600">Amazing</span> Shows
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Explore thousands of TV shows from around the world
          </p>

          <SearchBar onSearch={searchMovies} />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-gray-900 rounded-xl p-1 border border-gray-800">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Movies Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
            />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-red-400 text-xl">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchPopularMovies}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && !error && movies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">No shows found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
