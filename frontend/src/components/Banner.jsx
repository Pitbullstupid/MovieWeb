import React from "react";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart,
  faCircleExclamation,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { movies } from "@/lib/data";
import { genreMap } from "@/lib/data";
import { Link } from "react-router-dom"; //đường dẫn
const Banner = () => {
  return (
    <div className="w-full h-[500px] relative overflow-hidden">
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
      <div className="w-full h-full flex  justify-between gap-[30px] p-4 relative z-10">
        <div className="space-y-4 items-baseline mt-20 w-[40%] ml-5">
          {/* Title */}
          <h1>
            <Link
              to={`/phim/${movies[0].original_title}`}
              className="text-4xl font-bold text-white cursor-pointer"
            >
              {movies[0].title || movies[0].original_title}
            </Link>
          </h1>
          {/* Evaluate */}
          <div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  size={30}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>
          {/* Genre */}
          <div className="flex space-x-3">
            {movies[0].genre_ids?.map((gid) => (
              <Link to={`/the-loai/${gid}`}>
                <Badge
                  key={gid}
                  className="bg-[#23272f]/40 text-white rounded-lg px-3 py-1 text-base font-normal shadow-none border border-white/30 hover:text-yellow-300 cursor-pointer h-fit "
                >
                  {genreMap[gid]}
                </Badge>
              </Link>
            ))}
          </div>
          {/* Overview */}
          <p className="text-white">{movies[0].overview}</p>
          {/* Nav */}
          <div>
            <div className="flex items-center space-x-4">
              <Link to={`/xem-phim/${movies[0].original_title}`}>
              <button className="w-16 h-16 rounded-full bg-gradient-to-r from-[#face5c] to-[#FFEBB7] text-white hover:scale-110 transition-transform duration-500 hover:shadow-[0_0_15px_4px_rgba(250,206,92,0.8)] ">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-black text-3xl "
                />
              </button>
              </Link>
              <div className="flex items-center space-x-4 border p-2 rounded-full">
                <button>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="mx-auto text-white text-2xl pt-[2px] hover:text-yellow-400"
                  />
                </button>
                <Link to={`/phim/${movies[0].original_title}`}>
                  <button>
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="mx-auto text-white text-2xl pt-[2px] hover:text-yellow-400"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-[60%] flex items-center justify-center ">
          <Link to={`/phim/${movies[0].original_title}`}>
            <div className="w-full max-w-[250px] h-[300px] relative z-10">
              <img
                src={`https://image.tmdb.org/t/p/original/${movies[0].poster_path}`}
                alt="Banner Image"
                className="w-[250px] h-full object-cover rounded-lg shadow-lg"
              />
              <div className="w-[250px] h-full absolute top-0 left-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 cursor-pointer bg-black/30">
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
