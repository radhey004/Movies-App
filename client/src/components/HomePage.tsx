import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, TrendingUp, Search } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div> */}
        <div className="absolute inset-0 z-0 overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover -translate-y-10"
  >
    <source src="/herovideo.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
</div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Discover Your Next
            <span className="text-red-600 block">Favorite Movie</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            Explore millions of movies, find trending releases, and discover hidden gems
            all in one beautifully designed platform.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-600/25"
          >
            <Play className="w-6 h-6" />
            Get Started
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose CineMax?
            </h2>
            <p className="text-xl text-gray-400">
              The ultimate movie discovery experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "Trending Movies",
                description: "Stay updated with the hottest movies trending worldwide"
              },
              {
                icon: <Search className="w-12 h-12" />,
                title: "Smart Search",
                description: "Find any movie instantly with our powerful search engine"
              },
              {
                icon: <Star className="w-12 h-12" />,
                title: "Top Rated",
                description: "Discover critically acclaimed and audience-favorite films"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="text-center p-8 bg-gray-900 bg-opacity-50 rounded-xl border border-gray-800 hover:border-red-600 transition-all duration-300"
              >
                <div className="text-red-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Movie Journey?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Join thousands of movie enthusiasts discovering their next favorite film
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-red-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Exploring Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};