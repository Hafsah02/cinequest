import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";

const Cards = ({ movie, updateFavorites }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav) => fav.imdbID === movie.imdbID));

    return () => {
      clearTimeout(timer);
    };
  }, [movie.imdbID]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isFavorite) {
      if (location.pathname === "/movies/favorites") {
        setIsRemoving(true);
        setTimeout(() => {
          const newFavorites = favorites.filter(
            (fav) => fav.imdbID !== movie.imdbID
          );
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
          setIsFavorite(false);
          updateFavorites();
        }, 500);
      } else {
        const newFavorites = favorites.filter(
          (fav) => fav.imdbID !== movie.imdbID
        );
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setIsFavorite(false);
      }
    } else {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movie/${movie.imdbID}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div
            className={`cards ${isRemoving ? "fade-out" : ""}`}
            style={{
              opacity: isRemoving ? 0 : 1,
              transform: isRemoving ? "scale(0.8)" : "scale(1)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <img className="cards__img" src={movie?.Poster} />
            <div className="cards__overlay">
              <i
                className={`fa fa-heart ${isAnimating ? "pop" : ""}`}
                style={{
                  paddingTop: "1rem",
                  alignSelf: "end",
                  color: isFavorite ? "red" : "white",
                  cursor: "pointer",
                  transform: isAnimating ? "scale(1.3)" : "scale(1)",
                  transition: "transform 0.3s ease",
                }}
                onClick={handleFavoriteClick}
              />
              <div className="card__title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="card__runtime">
                {movie ? movie.release_date : ""}
              </div>
              <div className="card__description">
                {movie ? movie.Title : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
