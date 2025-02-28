import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorites from "./pages/favorites/favorites";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/movie";
import { MovieProvider } from "./context/movieContext";
import "./App.css";

function App() {
  return (
    <MovieProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="movie/:id" element={<Movie />}></Route>
            <Route path="movies/:type" element={<MovieList />}></Route>
            <Route path="movies/favorites" element={<Favorites />}></Route>
            <Route path="/*" element={<h1>Error Page</h1>}></Route>
          </Routes>
        </Router>
      </div>
    </MovieProvider>
  );
}

export default App;
