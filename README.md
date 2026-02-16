<div align="center">

# 🎬 CineMax HD

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://cinemax-hd.netlify.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)

*Your Ultimate Destination for Movies and TV Shows*

[View Demo](https://cinemax-hd.netlify.app/) · [Report Bug](https://github.com/radhey004/Movies-App/issues) · [Request Feature](https://github.com/radhey004/Movies-App/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Contact](#-contact)

## 🎯 About

**CineMax HD** is a full-stack web application that provides a comprehensive platform for discovering and exploring movies and TV shows. Built with modern technologies, it offers a Netflix-like experience with rich content, detailed information, trailers, and personalized recommendations.

This project demonstrates proficiency in:
- Full-stack development (Frontend + Backend)
- API integration and data handling
- Responsive UI/UX design
- State management
- Modern JavaScript/TypeScript development

## ✨ Features

### 🎥 Content Discovery
- **Trending Content** - Discover what's popular in movies and TV shows
- **Search Functionality** - Find any movie or TV show instantly
- **Multiple Categories** - Browse by genres, ratings, release dates
- **Detailed Information** - View comprehensive details about each title
- **Cast & Crew** - Explore actors, directors, and production teams
- **Trailers & Videos** - Watch official trailers and clips

### 📺 TV Shows & Movies
- **Movie Database** - Extensive collection of movies from all genres
- **TV Series** - Browse popular and trending TV shows
- **Episode Guide** - Complete season and episode information
- **Release Calendar** - Stay updated on new releases
- **Ratings & Reviews** - See IMDB ratings and user reviews

### 🎨 User Experience
- **Responsive Design** - Seamless experience across all devices
- **Dark Theme** - Eye-friendly dark mode interface
- **Fast Search** - Real-time search results
- **Smooth Navigation** - Intuitive and user-friendly interface
- **High-Quality Images** - HD posters and backdrops
- **Loading States** - Elegant loading animations

### 🔧 Technical Features
- **RESTful API** - Backend API for data management
- **API Integration** - Connected to external movie databases (TMDB/OMDB)
- **Optimized Performance** - Fast loading and smooth interactions
- **Error Handling** - Graceful error management
- **Type Safety** - TypeScript for robust code

## 🛠️ Tech Stack

### Frontend
- **[React](https://reactjs.org/)** - UI library for building interactive interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)** - Modern styling and animations
- **[Axios](https://axios-http.com/)** - HTTP client for API requests

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Server-side logic

### APIs & Services
- **[TMDB API](https://www.themoviedb.org/documentation/api)** - The Movie Database API (or similar)
- **[OMDB API](http://www.omdbapi.com/)** - Open Movie Database API (or similar)

### Hosting
- **[Netlify](https://www.netlify.com/)** - Frontend hosting
- Backend hosted separately (or serverless functions)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- API keys from movie database services (TMDB/OMDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/radhey004/Movies-App.git
   cd Movies-App
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure Environment Variables**
   
   Create `.env` file in the `server` directory:
   ```env
   PORT=5000
   TMDB_API_KEY=your_tmdb_api_key
   OMDB_API_KEY=your_omdb_api_key
   ```
   
   Create `.env` file in the `client` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Start the Backend Server**
   ```bash
   cd server
   npm start
   # Server runs on http://localhost:5000
   ```

6. **Start the Frontend Development Server**
   ```bash
   cd client
   npm start
   # Application opens at http://localhost:3000
   ```

## 📁 Project Structure

```
Movies-App/
├── client/                 # Frontend React application
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── MovieCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── NavBar.tsx
│   │   │   └── ...
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── MovieDetails.tsx
│   │   │   ├── TVShows.tsx
│   │   │   └── ...
│   │   ├── services/      # API service functions
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main App component
│   │   └── index.tsx      # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── server/                # Backend Node.js application
│   ├── routes/           # API routes
│   │   ├── movies.js
│   │   ├── tvshows.js
│   │   └── search.js
│   ├── controllers/      # Route controllers
│   ├── services/         # Business logic
│   ├── middleware/       # Custom middleware
│   ├── config/          # Configuration files
│   ├── server.js        # Server entry point
│   └── package.json
│
└── README.md
```

## 📜 Available Scripts

### Frontend (client/)
| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |

### Backend (server/)
| Command | Description |
|---------|-------------|
| `npm start` | Start the server |
| `npm run dev` | Start server with nodemon (hot reload) |

## 🔌 API Integration

This application integrates with external movie database APIs to fetch content.

### Key API Endpoints (Backend)

```
GET /api/movies/trending          # Get trending movies
GET /api/movies/:id               # Get movie details
GET /api/movies/search?q=query    # Search movies
GET /api/tvshows/popular          # Get popular TV shows
GET /api/tvshows/:id              # Get TV show details
GET /api/tvshows/:id/season/:num  # Get season details
```

### External APIs Used
- **TMDB (The Movie Database)** - Primary source for movie and TV show data
- Provides comprehensive information including titles, descriptions, ratings, cast, and media

### API Configuration
To use this project, you'll need to:
1. Sign up for a free API key at [TMDB](https://www.themoviedb.org/settings/api)
2. Add your API key to the server `.env` file
3. The backend handles all API calls to protect your API keys

## 💡 Key Features Implementation

### Search Functionality
Real-time search with debouncing for optimal performance and reduced API calls.

### Content Caching
Smart caching strategy to minimize API requests and improve load times.

### Responsive Grid Layout
CSS Grid and Flexbox for perfect content display on all screen sizes.

### Dynamic Routing
React Router for seamless navigation between movies, TV shows, and details pages.

### Error Boundaries
Graceful error handling to prevent app crashes and show user-friendly messages.

## 📬 Contact

**Radhey**

- Portfolio: [radhey-k.vercel.app](https://radhey-k.vercel.app/)
- GitHub: [@radhey004](https://github.com/radhey004)
- Project Link: [https://github.com/radhey004/Movies-App](https://github.com/radhey004/Movies-App)
- Live Demo: [https://cinemax-hd.netlify.app/](https://cinemax-hd.netlify.app/)

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

<div align="center">
  <sub>Built with 🎬 for movie and TV show enthusiasts</sub>
</div>
