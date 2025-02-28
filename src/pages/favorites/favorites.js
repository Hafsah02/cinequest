import { useState, useEffect } from "react";
import Cards from "../../components/card/card";
import "./favorites.css";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteMovies(favorites);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="movie__list">
      <h2 className="list__title">Favorite Movies</h2>
      <div className="list">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Cards
              key={movie.imdbID}
              movie={movie}
              updateFavorites={getFavorites}
            />
          ))
        ) : (
          <p>No Movies found!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
