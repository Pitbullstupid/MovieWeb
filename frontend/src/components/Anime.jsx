import { Star } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { movies } from "@/lib/data";
import { genreMap } from "@/lib/data";

const Anime = () => {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  return (
    <div className="flex p-1 bg-gradient-to-r from-black to-gray-900 w-full h-[800px]">
      <div className="m-6 bg-gradient-to-r from-[#272A39] to-[#272A39]/100 rounded-lg w-full h-[400px] flex relative">
        <div className="w-[40%] mt-6 ml-6 space-y-3">
          <h1 className="text-white font-bold text-2xl ">
            {selectedMovie.title || selectedMovie.original_title}
          </h1>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star
                key={i}
                size={30}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <div className="flex gap-3 w-[80%] h-[70px] flex-wrap">
            {selectedMovie.genre_ids?.map((gid) => (
              <Badge
                key={gid}
                className="bg-[#23272f] text-white rounded-lg px-3 py-1 text-base font-normal shadow-none border border-white/30 hover:text-yellow-300 cursor-pointer h-fit"
              >
                {genreMap[gid]}
              </Badge>
            ))}
          </div>
          <p className="text-white w-[80%] h-[80px]">
            {selectedMovie.overview.length > 150
              ? selectedMovie.overview.slice(0, 150) + "..."
              : selectedMovie.overview}
          </p>
          <div className="flex items-center space-x-4">
            <button className="w-16 h-16 rounded-full bg-gradient-to-r from-[#face5c] to-[#FFEBB7] text-white hover:scale-110 transition-transform duration-500 hover:shadow-[0_0_15px_4px_rgba(250,206,92,0.8)] ">
              <FontAwesomeIcon icon={faPlay} className="text-black text-3xl " />
            </button>
            <div className="flex items-center space-x-4 border p-2 rounded-full">
              <button>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="mx-auto text-white text-2xl pt-[2px] hover:text-yellow-400"
                />
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="mx-auto text-white text-2xl pt-[2px] hover:text-yellow-400"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="w-[60%] relative overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500/${selectedMovie.backdrop_path}`}
            alt={selectedMovie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#272A39] via-[#272A39]/5 to-transparent"></div>
        </div>

        {/* menu img */}
        <div className="absolute -bottom-[60px] left-[50%] -translate-x-1/2 z-20  flex gap-4 p-2">
          {movies.slice(0, 5).map((movie, i) => (
            <div
              key={i}
              onClick={() => setSelectedMovie(movie)}
              className={`w-[80px] h-[120px] rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ${
                selectedMovie.id === movie.id ? "ring-4 ring-yellow-400" : ""
              }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
