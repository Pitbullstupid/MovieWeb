import AnimatedPage from "@/components/AnimatedPage";
import Header from "@/components/Header";
import { genreMap } from "@/lib/data";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faHeart,
  faShare,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import ReactPlayer from "react-player";
import { toast } from "sonner";
import ModalShare from "@/components/ModalShare";
import AdModal from "@/components/AdModal";
import { Spinner } from "@/components/ui/spinner";

const WatchMovie = () => {
  const { slug } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const decodedSlug = decodeURIComponent(slug || "")
    .trim()
    .normalize("NFC")
    .toLowerCase();

  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);

  const findNormalized = (s) => (s || "").trim().normalize("NFC").toLowerCase();

  useEffect(() => {
    let cancelled = false;
    const fetchMovies = async () => {
      setLoading(true);
      setMoviesData([]);
      try {
        const res = await fetch("http://localhost:5001/api/movies");
        const data = await res.json();
        if (!cancelled) {
          setMoviesData(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) setMoviesData([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchMovies();
    return () => {
      cancelled = true;
    };
  }, [decodedSlug]);

  const movie = useMemo(
    () =>
      moviesData.find(
        (m) =>
          findNormalized(m.original_title) === decodedSlug ||
          findNormalized(m.title) === decodedSlug
      ),
    [moviesData, decodedSlug]
  );

  // Lấy link phim từ phimapi
  useEffect(() => {
    let cancelled = false;
    const fetchMovieVideo = async () => {
      setVideoUrl(null);
      if (!movie?.movieId) return;

      try {
        const res = await fetch(
          `https://phimapi.com/tmdb/movie/${movie.movieId}`
        );
        const data = await res.json();

        const vietsub = data.episodes?.find((ep) =>
          ep.server_name.toLowerCase().includes("vietsub")
        );
        const fallbackServer = data.episodes?.[0];

        const link =
          vietsub?.server_data?.[0]?.link_m3u8 ||
          vietsub?.server_data?.[0]?.link_embed ||
          fallbackServer?.server_data?.[0]?.link_m3u8 ||
          data.trailer_url ||
          null;
        if (!cancelled) setVideoUrl(link);
      } catch {
        if (!cancelled) setVideoUrl(null);
      }
    };
    fetchMovieVideo();
    return () => {
      cancelled = true;
    };
  }, [movie]);
  // add favourite movie
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
  const [watchedMovies, setWatchedMovies] = useState([]);
  useEffect(() => {
    if (user && user.watchedMovies) {
      setWatchedMovies(user.watchedMovies);
    }
  }, [user]);
  const handleWatchedMovie = async (movieId) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập trước!");
      return;
    }

    let newWatchedList = watchedMovies.includes(movieId)
      ? watchedMovies
      : [...watchedMovies, movieId];

    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            watchedMovies: newWatchedList,
          }),
        }
      );
      setWatchedMovies(newWatchedList);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
  if (videoUrl && !user?.isPremium) {
    toast.info("Vui lòng đăng nhập trước hoặc nâng cấp tài khoản để xem phim!");
  }
}, [videoUrl, user]);

  if (loading)
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <Spinner className="text-xl text-white" />
          <p className="mt-3 text-xl text-white">Đang tải dữ liệu...</p>
        </div>
      </>
    );
  if (!movie) return <div className="p-10 text-white">Không tìm thấy phim</div>;

  return (
    <>
      <Header />
      {!user?.isPremium && <AdModal user={user} />}
      <AnimatedPage key={slug}>
        <div className="pt-[10px] w-full bg-[#191B24]">
          {/* Title */}
          <div className="mt-20 ml-10 mb-4 flex text-white items-center space-x-2">
            <Link to={`/phim/${movie.original_title || movie.title}`}>
              <FontAwesomeIcon icon={faCircleChevronLeft} className="w-5" />
            </Link>
            <h1 className="font-semibold">
              Xem phim {movie.title || movie.original_title}
            </h1>
          </div>

          {/* Video */}
          {videoUrl ? (
            user?.isPremium ? (
              <ReactPlayer
                key={videoUrl}
                url={videoUrl}
                controls
                width="90%"
                height="610px"
                playing
                light={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                onPlay={() => handleWatchedMovie(movie.movieId)}
                className="mx-auto rounded-t-2xl overflow-hidden"
              />
            ) : (
              <>
              <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className="w-[90%] h-[610px] mx-auto rounded-t-2xl overflow-hidden" />
              </>
            )
          ) : (
            <div className="text-white p-10 min-h-[500px] bg-black w-[90%] mx-auto flex flex-col items-center justify-center ">
              <Spinner className="text-sm text-white" />
              <p className="text-sm text-white">Đang tải dữ liệu...</p>
            </div>
          )}

          {/* Yêu thích & Chia sẻ */}
          <div className="flex items-center justify-start w-[90%] gap-3 mx-auto bg-black border-t-[1.5px] border-gray-900 pt-2 pb-2 rounded-bl-2xl rounded-br-2xl">
            <div
              className="flex items-center gap-2 ml-2"
              onClick={() => handleFavouriteMovie(movie.movieId)}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={`text-white
                    ${
                      favouriteMovies.includes(movie.movieId)
                        ? "text-yellow-500 hover:text-yellow-400"
                        : "text-white hover:text-yellow-400"
                    }`}
              />
              <p className="text-white mr-2">Yêu thích</p>
            </div>
            <div
              className="flex items-center gap-2 ml-2"
              onClick={() => setOpenModal(true)}
            >
              <FontAwesomeIcon
                icon={faShare}
                className="text-white hover:text-yellow-400"
              />
              <p className="text-white mr-2">Chia sẻ</p>
            </div>
          </div>

          {/* Chi tiết phim */}
          <div className="w-[90%] mx-auto mt-5 flex gap-5 pb-5">
            {/* Poster */}
            <div className="w-[10%]">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.original_title}
                className="w-full h-fit rounded-2xl object-cover"
              />
            </div>

            {/* Thông tin */}
            <div className="w-[35%] space-y-1.5">
              <h1 className="text-white font-bold">
                {movie.title || movie.original_title}
              </h1>
              <p className="text-yellow-400 text-sm mb-4">
                {movie.original_title}
              </p>
              <div className="flex flex-wrap gap-2 w-[100%]">
                {movie.genre_ids?.map((gid) => (
                  <Link key={gid} to={`/the-loai/${gid}`}>
                    <Badge className="bg-[#23272f]/40 text-white rounded-lg px-3 py-1 text-sm font-normal shadow-none border border-white/30 hover:text-yellow-300 cursor-pointer">
                      {genreMap[gid]}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mô tả */}
            <div className="w-[30%] space-y-3">
              <p className="text-sm text-[#5E5F64]">{movie.overview}</p>
              <Link to={`/phim/${movie.original_title}`}>
                <p className="text-sm text-yellow-400 cursor-pointer">
                  Thông tin phim{" "}
                  <ChevronRight size={15} className="inline-block" />
                </p>
              </Link>
            </div>

            {/* Đánh giá */}
            <div>
              <button className="w-[150px] h-[40px] flex items-center gap-2 justify-center rounded-full bg-[#3556B6] ml-[150px]">
                <FontAwesomeIcon
                  icon={faCertificate}
                  className="text-white text-xl"
                />
                <p className="text-white text-xl flex items-center gap-1 font-bold">
                  {Number(movie.vote_average || 0).toFixed(2)}
                  <span className="text-sm font-normal">đánh giá</span>
                </p>
              </button>
            </div>
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

export default WatchMovie;
