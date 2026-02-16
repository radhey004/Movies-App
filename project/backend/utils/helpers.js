// Utility functions for the application

/**
 * Format date to readable string
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Remove HTML tags from text
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

/**
 * Generate a random color based on string input
 * @param {string} str - Input string
 * @returns {string} HEX color code
 */
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
};

/**
 * Capitalize the first letter of each word
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Format rating with stars
 * @param {number} rating - Rating value
 * @param {number} max - Maximum rating value
 * @returns {string} Star representation
 */
const formatRating = (rating, max = 10) => {
  if (!rating) return 'No rating';
  
  const normalizedRating = (rating / max) * 5;
  const fullStars = Math.floor(normalizedRating);
  const halfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars) + ` (${rating})`;
};

/**
 * Get current year
 * @returns {number} Current year
 */
const getCurrentYear = () => {
  return new Date().getFullYear();
};

module.exports = {
  formatDate,
  truncateText,
  stripHtml,
  stringToColor,
  capitalizeWords,
  isValidEmail,
  debounce,
  formatRating,
  getCurrentYear
};