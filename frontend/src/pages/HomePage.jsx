import AdModal from "@/components/AdModal";
import AnimatedPage from "@/components/AnimatedPage";
import Anime from "@/components/Anime";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HotMovies from "@/components/HotMovies";
import LoadingOverlay from "@/components/LoadingOverlay";
import MoviesByRegion from "@/components/MoviesByRegion";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

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
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users");
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userId = localStorage.getItem("userId");
  const user = userList?.find((u) => u._id === userId);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div
        className={`transition-opacity duration-1000 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {!user?.isPremium && <AdModal user={user} />}
        <Header />
        <AnimatedPage>
          {movies.length > 0 ? (
            <>
              <Banner movies={movies} userList={userList} />
              <Category />
              <MoviesByRegion movies={movies} />
              <HotMovies movies={movies} />
              <Anime movies={movies} userList={userList} />
            </>
          ) : (
            <div className="text-center p-20">Không có phim nào!</div>
          )}
          <Footer />
        </AnimatedPage>
      </div>
    </>
  );
};

export default HomePage;
