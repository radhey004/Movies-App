import React from 'react';
import { motion } from 'framer-motion';
import { Film, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black border-t border-red-600 mt-16"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Film className="w-6 h-6 text-red-600" />
              <span className="text-xl font-bold text-white">CineMax</span>
            </div>
            <p className="text-gray-400 text-center md:text-left">
              Your ultimate destination for discovering amazing movies and staying up to date with the latest releases.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-center">
              <p className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors">Popular Movies</p>
              <p className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors">Top Rated</p>
              <p className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors">Trending</p>
              <p className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors">Search</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-white font-semibold mb-4">About</h3>
            <div className="space-y-2 text-center md:text-right">
              <p className="text-gray-400">Powered by TMDb API</p>
              <p className="text-gray-400">Built with MERN Stack</p>
              <div className="flex items-center gap-1 text-gray-400 justify-center md:justify-end">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-600" />
                <span>for Movie lovers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">© 2025 CineMax. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};