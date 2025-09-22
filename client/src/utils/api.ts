// api.ts
import axios from "axios";

//const BASE_URL = "https://api.tvmaze.com";
const BASE_URL = "https://api.tvmaze.com/shows?page=1";

export const fetchMovies = async (endpoint: string) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response.data;
};
export const getImageUrl = (path: string | null) => {
  return path ? path : "https://via.placeholder.com/210x295?text=No+Image";
};