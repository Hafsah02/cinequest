import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${query}&type=movie&apikey=e1c1eabc`
      );
      const data = await response.json();
      setMovieList(data.Search || []);
    } catch (err) {
      console.log("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider value={{ movieList, loading, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};
