import React from 'react';
import { motion } from 'framer-motion';
import { Film, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick, onHomeClick }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onHomeClick();
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-black bg-opacity-95 backdrop-blur-sm border-b border-red-600 sticky top-0 z-40"
    >
      <div className="container mx-auto px-2 py-2 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={onHomeClick}
        >
          <Film className="w-8 h-8 text-red-600" />
          <span className="text-2xl font-bold text-white">CineMax</span>
        </motion.div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{user.name}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAuthClick}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Login
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
};