
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { genreMap, languageCountryMap } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart,
  faShare,
  faCertificate,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import AnimatedPage from "@/components/AnimatedPage";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import Modal from "react-responsive-modal";
import ModalShare from "@/components/ModalShare";
import AdModal from "@/components/AdModal";
import { Spinner } from "@/components/ui/spinner";
import LoadingOverlay from "@/components/LoadingOverlay";

const MovieDetails = () => {
  const { slug } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const decodedSlug = decodeURIComponent(slug || "")
    .trim()
    .normalize("NFC")
    .toLowerCase();

  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/movies");
        const data = await res.json();
        setMoviesData(Array.isArray(data) ? data : []);
      } catch {
        setMoviesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const findNormalized = (s) => (s || "").trim().normalize("NFC").toLowerCase();

  const movie = moviesData.find(
    (m) =>
      findNormalized(m.original_title) === decodedSlug ||
      findNormalized(m.title) === decodedSlug
  );

  const [userList, setUserList] = useState([]);
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
  // add favourite movie
  const userId = localStorage.getItem("userId");
  const user = userList?.find((u) => u._id === userId);

  const [favouriteMovies, setFavouriteMovies] = useState([]);
  useEffect(() => {
    if (user && user.favoriteMovies) {
      setFavouriteMovies(user.favoriteMovies);
    }
  }, [user]);
  const handleFavouriteMovie = async (movieId) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập trước!");
      return;
    }

    let newFavouriteList;
    // add or remove
    if (favouriteMovies.includes(movieId)) {
      newFavouriteList = favouriteMovies.filter((id) => id !== movieId);
      toast.info("Đã xóa khỏi danh sách yêu thích");
    } else {
      newFavouriteList = [...favouriteMovies, movieId];
      toast.success("Đã thêm phim vào danh sách yêu thích");
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            favoriteMovies: newFavouriteList,
          }),
        }
      );
      setFavouriteMovies(newFavouriteList);
    } catch (error) {
      toast.error("Lỗi khi cập nhật danh sách yêu thích!");
      console.error(error);
    }
  };
  if (loading) return <LoadingOverlay loading={loading} />;
  const isExpired = user?.isPremium && new Date(user?.isPremium) < new Date();
  if (!movie) return <div className="p-10 text-white">Không tìm thấy phim</div>;

  return (
    <>
      <Header movies={moviesData}/>
      {(!user?.isPremium || isExpired) && <AdModal user={user} />}
      <AnimatedPage>
        {/* Banner */}
        <div className="relative w-full h-[500px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.original_title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191B24] via-[#272A39]/5 to-transparent"></div>
        </div>

        {/* Details */}
        <div className="w-full min-h-screen bg-[#191B24] flex">
          <div className="w-[40%] mt-8 ml-8 flex flex-col gap-2">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.original_title}
              className="w-[160px] h-[240px] rounded-2xl"
            />
            <h1 className="font-semibold text-2xl text-white">
              {movie.title || movie.original_title}
            </h1>
            <p className="text-[#D4B566]">{movie.original_title}</p>

            <div className="flex flex-wrap gap-2">
              {movie.genre_ids?.map((gid) => (
                <Link key={gid} to={`/the-loai/${gid}`}>
                  <Badge className="bg-[#23272f]/40 text-white border border-white/30 hover:text-yellow-300">
                    {genreMap[gid] || gid}
                  </Badge>
                </Link>
              ))}
            </div>

            <div>
              <p className="text-white font-semibold">Giới thiệu:</p>
              <p className="text-sm text-[#5E5F64]">{movie.overview}</p>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-white font-semibold">Quốc gia:</p>
              <p className="text-sm font-semibold text-[#b6b8c0]">
                {languageCountryMap[movie.original_language]}
              </p>
            </div>

            <div className="flex gap-2 items-center pb-5">
              <p className="text-white font-semibold">Ngày ra mắt:</p>
              <p className="text-sm font-semibold text-[#b6b8c0]">
                {movie.release_date
                  ? new Date(movie.release_date).toLocaleDateString("vi-VN")
                  : "—"}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-start mt-8 gap-8">
            <Link to={`/xem-phim/${movie.original_title}`}>
              <button className="w-[200px] h-14 rounded-full bg-gradient-to-r from-[#face5c] to-[#FFEBB7] flex items-center justify-center hover:scale-110 transition duration-300 cursor-pointer">
                <FontAwesomeIcon icon={faPlay} className="text-black text-xl" />
                <span className="text-black text-xl ml-2">Xem ngay</span>
              </button>
            </Link>

            <button
              className="flex flex-col items-center w-18 h-18 my-2"
              onClick={() => handleFavouriteMovie(movie.movieId)}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={` text-2xl cursor-pointer
                    ${
                      favouriteMovies.includes(movie.movieId)
                        ? "text-default hover:opacity-80"
                        : "text-white hover:text-default"
                    }`}
              />
              <p className="text-white text-sm">Yêu thích</p>
            </button>

            <button
              className="flex flex-col items-center w-18 h-18  my-2 cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              <FontAwesomeIcon
                icon={faShare}
                className="text-white text-2xl hover:text-default"
              />
              <p className="text-white text-sm">Chia sẻ</p>
            </button>

            <button className="w-[150px] h-[40px] flex items-center gap-2 justify-center rounded-full bg-[#3556B6] ml-[150px] mr-2">
              <FontAwesomeIcon
                icon={faCertificate}
                className="text-white text-xl"
              />
              <span className="text-white text-xl font-bold">
                {movie.vote_average.toFixed(2)}
              </span>
              <span className="text-sm font-normal text-white">đánh giá</span>
            </button>
          </div>
        </div>
        <Footer />
        <ModalShare
          open={openModal}
          onClose={() => setOpenModal(false)}
          slug={slug}
        />
      </AnimatedPage>
    </>
  );
};

export default MovieDetails;
