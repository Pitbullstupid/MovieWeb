import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import MovieGenre from "./pages/MovieGenre";
import WatchMovie from "./pages/WatchMovie";
import MovieRegion from "./pages/MovieRegion";
import CinemaMovies from "./pages/CinemaMovies";
import AnimeMovies from "./pages/AnimeMovies";
import Search from "./pages/Search";
import YearPage from "./pages/YearMovie";
import YearMovie from "./pages/YearMovie";

function App() {
  const [movie, setMovie] = useState();
  const didFetch = useRef(false);

  const fetchMovie = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    };
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=vi&page=1";
    const response = await fetch(url, options);
    const data = await response.json();
    const movieId = data.results[0].id;
    const urlTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
    const responseTrailer = await fetch(urlTrailer, options);
    const trailerData = await responseTrailer.json();

    console.log(trailerData);
    console.log(data);
  };

  useEffect(() => {
    if (didFetch.current) return; // nếu đã gọi rồi thì không gọi nữa
    didFetch.current = true;
    fetchMovie();
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        <Toaster richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phim/:slug" element={<MovieDetails />} />
            <Route path="/the-loai/:slug" element={<MovieGenre />} />
            <Route path="/xem-phim/:slug" element={<WatchMovie />} />
            <Route path="/quoc-gia/:slug" element={<MovieRegion />} />
            <Route path="/phim-chieu-rap" element={<CinemaMovies />} />
            <Route path="/anime" element={<AnimeMovies />} />
            <Route path="/tim-kiem/:slug" element={<Search />} />
            <Route path="/nam-phat-hanh/:slug" element={<YearMovie />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}

export default App;
