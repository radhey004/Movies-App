import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { HomePage } from "./components/HomePage";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { Toast } from "./components/Toast";
import MovieDetails from "./components/MovieDetails"; 
import MovieAssistant from "./components/MovieAssistant";
import ScrollToTop from "./utils/ScrollToTop";

// ---------------- App Content ----------------
const AppContent: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  const navigate = useNavigate();

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard"); // 👈 go to dashboard if logged in
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    navigate("/dashboard"); // 👈 go to dashboard after login
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // 👈 send back to home
    showToast("Logout successful! See you again soon.", "success");
  };

  return (
    <div className="min-h-screen bg-black">
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onHomeClick={() => navigate("/")}
        onLogout={handleLogout}
      />

      {/* 👇 Routing between pages */}
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HomePage onGetStarted={handleGetStarted} />
              </motion.div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Dashboard />
              </motion.div>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <motion.div
                key="movie"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MovieDetails />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        showToast={showToast}
      />

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

// ---------------- Main App Wrapper ----------------
function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <MovieAssistant />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
