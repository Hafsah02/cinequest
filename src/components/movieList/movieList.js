import { useContext, useEffect } from "react";
import Cards from "../card/card";
import { MovieContext } from "../../context/movieContext";
import "./movieList.css";

const MovieList = () => {
  const { movieList, fetchMovies } = useContext(MovieContext);

  const movieSearchTerms = [
    "batman",
    "superman",
    "spider-man",
    "avengers",
    "star wars",
    "harry potter",
    "indiana jones",
    "jurassic park",
  ];

  useEffect(() => {
    const randomMovie =
      movieSearchTerms[Math.floor(Math.random() * movieSearchTerms.length)];
    fetchMovies(randomMovie);
  }, []);

  return (
    <div className="movie__list">
      <>
        <h2 className="list__title">Movies</h2>
        <div className="list__cards">
          {movieList?.map((movie) => (
            <Cards key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </>
    </div>
  );
};

export default MovieList;
