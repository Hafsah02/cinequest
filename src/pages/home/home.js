import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import MovieList from "../../components/movieList/movieList";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=c7a59ad389576b8e6dc038b3398059cf"
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div className="poster">
      <Carousel
        className="carousel"
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {movies.map((movie, index) => (
          <Link
            key={index}
            style={{ textDecoration: "none", color: "white" }}
            to={`/movie/${movie.id}`}
          >
            <div className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">{movie.original_title}</div>
              <div className="posterImage__runtime">{movie.release_date}</div>
            </div>
          </Link>
        ))}
      </Carousel>
      <MovieList />
    </div>
  );
};

export default Home;
