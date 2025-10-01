import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router";
const HotMovies = ({ movies }) => {
  //tạo 1 mảng sắp xếp theo popularity
  const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
  return (
    <div className="flex p-1 bg-gradient-to-r from-black to-gray-900 w-full h-[470px]">
      <div className="ml-5 w-full">
        <h1 className="font-bold text-white text-2xl">Top 10 phim hôm nay</h1>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="flex gap-5">
                {sortedMovies.slice(0, 5).map((movie, index) => (
                  <div
                    key={movie.id}
                    className={`w-[20%] h-[400px] overflow-hidden mt-3 rounded-2xl ${
                      index % 2 === 0
                        ? "clip-trapezoidright"
                        : "clip-trapezoidleft"
                    }`}
                  >
                    <Link to={`/phim/${movie.original_title}`}>
                      <div className="group relative">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          className="w-full h-[350px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                          <FontAwesomeIcon
                            icon={faCirclePlay}
                            className="text-white text-3xl hover:text-gray-400"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <h1 className="w-[25%] text-center font-bold text-5xl italic bg-clip-text text-transparent bg-gradient-to-t from-yellow-600 to-yellow-400">
                          {index + 1}
                        </h1>
                        <div className="w-[75%]">
                          <h3 className="text-white hover:text-yellow-400 cursor-pointer">
                            {movie.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {movie.original_title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex gap-5">
                {sortedMovies.slice(5, 10).map((movie, index) => (
                  <div
                    key={movie.id}
                    className={`w-[20%] h-[400px] overflow-hidden mt-3 rounded-2xl ${
                      index % 2 === 0
                        ? "clip-trapezoidright"
                        : "clip-trapezoidleft"
                    }`}
                  >
                    <Link to={`/phim/${movie.original_title}`}>
                      <div className="group relative">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          className="w-full h-[350px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                          <FontAwesomeIcon
                            icon={faCirclePlay}
                            className="text-white text-3xl hover:text-gray-400"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <h1 className="w-[25%] text-center font-bold text-5xl italic bg-clip-text text-transparent bg-gradient-to-t from-yellow-600 to-yellow-400">
                          {index + 6}
                        </h1>
                        <div className="w-[75%]">
                          <h3 className="text-white hover:text-yellow-400 cursor-pointer">
                            {movie.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {movie.original_title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="top-[40%] left-[-10px]" />
          <CarouselNext className="top-[40%] right-[-2px]" />
        </Carousel>
      </div>
    </div>
  );
};

export default HotMovies;
