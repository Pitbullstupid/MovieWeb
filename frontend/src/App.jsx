import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import MovieGenre from "./pages/MovieGenre";
function App() {
  const [movie, setMovie] = useState();

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
    console.log(data);
  };

  useEffect(() => {
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
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}

export default App;
