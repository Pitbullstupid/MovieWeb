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
