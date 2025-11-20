import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { genreMap } from "@/lib/data";
import { Link } from "react-router";
import { toast } from "sonner";

const Anime = ({ movies, userList }) => {
  // Lọc ra chỉ những phim có gid = 16 (Anime)
  const animeMovies = movies.filter((m) => m.genre_ids?.includes(16));

  // Nếu không có phim Anime thì return null
  if (animeMovies.length === 0) return null;

  const [selectedMovie, setSelectedMovie] = useState(animeMovies[0]);

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
  return (
    <div className="flex p-1 bg-gradient-to-r from-black to-gray-900 w-full min-h-[550px]">
      <div className="m-6 bg-gradient-to-r from-[#272A39] to-[#272A39]/100 rounded-lg w-full h-[400px] flex relative">
        <div className="w-[40%] mt-6 ml-6 space-y-4">
          {/* Title */}
          <Link to={`/phim/${selectedMovie.original_title}`}>
            <h1 className="text-white font-bold text-2xl ">
              {selectedMovie.title || selectedMovie.original_title}
            </h1>
          </Link>

          {/* Evaluate */}
          <div className="flex items-center space-x-1 mt-3">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star
                key={i}
                size={30}
                className="text-default fill-default"
              />
            ))}
          </div>

          {/* Genre */}
          <div className="flex gap-3 w-[80%] h-[70px] flex-wrap">
            {selectedMovie.genre_ids?.map((gid) => (
              <Link key={gid} to={`/the-loai/${gid}`}>
                <Badge className="bg-[#23272f]/40 text-white rounded-lg px-3 py-1 text-base font-normal shadow-none border border-white/30 hover:text-default cursor-pointer h-fit">
                  {genreMap[gid]}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Overview */}
          <p className="text-white w-[80%] h-[80px]">
            {selectedMovie.overview.length > 150
              ? selectedMovie.overview.slice(0, 150) + "..."
              : selectedMovie.overview}
          </p>

          {/* Nav */}
          <div className="flex items-center space-x-4">
            <Link to={`/xem-phim/${selectedMovie.original_title}`}>
              <button className="w-16 h-16 rounded-full bg-gradient-to-r from-[#face5c] to-[#FFEBB7] text-white hover:scale-110 transition-transform duration-500 hover:shadow-[0_0_15px_4px_rgba(250,206,92,0.8)] cursor-pointer">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-black text-3xl "
                />
              </button>
            </Link>
            <div className="flex items-center space-x-4 border p-2 rounded-full">
              <button onClick={() => handleFavouriteMovie(selectedMovie.movieId)}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`mx-auto text-2xl pt-[2px] transition-colors duration-300 cursor-pointer
                    ${
                      favouriteMovies.includes(selectedMovie.movieId)
                        ? "text-default hover:opacity-80"
                        : "text-white hover:text-default"
                    }`}
                />
              </button>
              <Link to={`/phim/${selectedMovie.original_title}`}>
                <button>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="mx-auto text-white text-2xl pt-[2px] hover:text-default cursor-pointer"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main img */}
        <div className="w-[60%] relative overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
            alt={selectedMovie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#272A39] via-[#272A39]/5 to-transparent"></div>
        </div>

        {/* Menu img */}
        <div className="absolute -bottom-[60px] left-[50%] -translate-x-1/2 z-20  flex gap-4 p-2">
          {animeMovies.slice(0, 5).map((movie, i) => (
            <div
              key={i}
              onClick={() => setSelectedMovie(movie)}
              className={`w-[80px] h-[120px] rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ${
                selectedMovie.movieId === movie.movieId
                  ? "ring-4 ring-default"
                  : ""
              }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Anime;
