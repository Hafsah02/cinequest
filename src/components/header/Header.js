import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import SearchBar from "../searchBar/searchBar";
import { MovieContext } from "../../context/movieContext";
import "./Header.css";

const Header = () => {
  const { fetchMovies } = useContext(MovieContext);

  return (
    <div
      className="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#000",
        width: "100%",
      }}
    >
      <div className="headerLeft">
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <img className="header__icon" src={Logo} />
        </Link>
        <Link to="/movies/favorites" style={{ textDecoration: "none" }}>
          <span>Favorites</span>
        </Link>
      </div>
      <div className="headerRight">
        <SearchBar onSearch={fetchMovies} />
      </div>
    </div>
  );
};

export default Header;
