import AnimatedPage from "@/components/AnimatedPage";
import Anime from "@/components/Anime";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HotMovies from "@/components/HotMovies";
import MoviesByRegion from "@/components/MoviesByRegion";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Lỗi khi lấy movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <AnimatedPage>
        {movies.length > 0 ? (
          <>
            <Banner movies={movies} />
            <Category />
            <MoviesByRegion movies={movies} />
            <HotMovies movies={movies} />
            <Anime movies={movies} />
          </>
        ) : (
          <div className="text-center p-100">Không có phim nào!</div>
        )}
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default HomePage;
