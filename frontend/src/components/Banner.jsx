import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart,
  faCircleExclamation,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";

import { genreMap } from "@/lib/data";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const Banner = ({ movies, userList }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-black text-white">
        Đang tải dữ liệu...
      </div>
    );
  }
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
  // cut string
  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className=" w-full h-[600px]  relative overflow-hidden">
      {/* Video bg */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Detail */}
      <div className="w-full h-full flex justify-between gap-[30px] p-4 relative z-10">
        <div className="space-y-4 items-baseline mt-20 w-[40%] ml-5">
          {/* Title */}
          <h1>
            <Link
              to={`/phim/${movies[2].original_title}`}
              className="text-[35px] font-bold text-white cursor-pointer"
            >
              {movies[2].title || movies[2].original_title}
            </Link>
          </h1>
          {/* Evaluate */}
          <div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} size={35} className="text-default fill-default" />
              ))}
            </div>
          </div>
          {/* Genre */}
          <div className="flex space-x-3 pt-2">
            {movies[2].genre_ids?.map((gid) => (
              <Link key={gid} to={`/the-loai/${gid}`}>
                <Badge className="bg-[#23272f]/40 text-white rounded-lg px-3 py-1 text-base font-normal shadow-none border border-white/30 hover:text-default cursor-pointer h-fit ">
                  {genreMap[gid]}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Overview */}
          <p className="text-white text-[18px] pt-3">{truncate(movies[2].overview, 260)}</p>
          {/* Nav */}
          <div className="pt-3">
            <div className="flex items-center space-x-6">
              <Link to={`/xem-phim/${movies[2].original_title}`}>
                <button className="w-18 h-18 rounded-full bg-gradient-to-r from-[#face5c] to-[#FFEBB7] text-white hover:scale-110 transition-transform duration-500 hover:shadow-[0_0_15px_4px_rgba(250,206,92,0.8)] cursor-pointer">
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="text-black text-3xl "
                  />
                </button>
              </Link>
              <div className="flex items-center space-x-4 border p-2 rounded-full ">
                <button onClick={() => handleFavouriteMovie(movies[2].movieId)}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`mx-auto text-[28px] pt-[2px] transition-colors duration-300 cursor-pointer
                    ${
                      favouriteMovies.includes(movies[2].movieId)
                        ? "text-default hover:opacity-80"
                        : "text-white hover:text-default"
                    }`}
                  />
                </button>

                <Link to={`/phim/${movies[2].original_title}`}>
                  <button>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="mx-auto text-white text-[28px] pt-[2px] hover:text-default cursor-pointer"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-[60%] flex items-center justify-center ">
          <Link to={`/phim/${movies[2].original_title}`}>
            <div className="w-full max-w-[250px] h-[300px] relative z-10 mt-7 ml-20">
              <img
                src={`https://image.tmdb.org/t/p/original/${movies[2].poster_path}`}
                alt="Banner Image"
                className="w-[230px] h-full object-cover rounded-lg shadow-lg object-top"
              />
              <div className="w-[230px] h-full absolute top-0 left-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 cursor-pointer bg-black/30">
                <FontAwesomeIcon
                  icon={faCirclePlay}
                  className="text-white text-3xl hover:text-gray-400"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default Banner;
