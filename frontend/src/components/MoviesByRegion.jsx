import React from "react";
import "react-multi-carousel/lib/styles.css";
import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { movies } from "@/lib/data";
const MoviesByRegion = () => {
  return (
    <div className="flex p-1 bg-gradient-to-r from-black to-gray-900 w-full h-[910px]">
      <div className="m-6 bg-[#272A39] rounded-lg p-5 w-full">
        {/* Phim Hàn Quốc mới */}
        <div className="flex justify-start mt-2">
          <div className="w-[18%] h-[270px] flex flex-col justify-center">
            <h1 className="pl-4 w-[80%] font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#6d459e] to-[#b6b2b2]">
              Phim Hàn Quốc mới
            </h1>
            <p className="text-sm pl-4 hover:text-yellow-400 text-white mt-2 cursor-pointer">
              Xem toàn bộ <ChevronRight size={15} className="inline-block" />
            </p>
          </div>
          <div className="w-[82%] h-[270px]">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div className="flex">
                    {movies.slice(0, 3).map((movie, index) => (
                      <div key={index} className="h-full px-2 w-[33%]">
                        <div className="relative w-full h-[200px] group overflow-hidden rounded-lg">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt= {`${movie.title}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 "
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <FontAwesomeIcon
                              icon={faCirclePlay}
                              className="text-white text-3xl hover:text-gray-400"
                            />
                          </div>
                        </div>
                        <h3 className="font-semibold text-white pl-4 hover:text-yellow-400 cursor-pointer">
                          {movie.title}
                        </h3>
                        <p className="pl-4 text-sm text-gray-500">
                          {movie.original_title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex">
                    {movies.slice(3, 6).map((movie, index) => (
                      <div key={index} className="h-full px-2 w-[33%]">
                        <div className="relative w-full h-[200px] group overflow-hidden rounded-lg">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt= {`${movie.title}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 "
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <FontAwesomeIcon
                              icon={faCirclePlay}
                              className="text-white text-3xl hover:text-gray-400"
                            />
                          </div>
                        </div>
                        <h3 className="font-semibold text-white pl-4 hover:text-yellow-400 cursor-pointer">
                          {movie.title}
                        </h3>
                        <p className="pl-4 text-sm text-gray-500">
                          {movie.original_title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex">
                    {movies.slice(6, 9).map((movie, index) => (
                      <div key={index} className="h-full px-2 w-[33%]">
                        <div className="relative w-full h-[200px] group overflow-hidden rounded-lg">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt= {`${movie.title}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 "
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <FontAwesomeIcon
                              icon={faCirclePlay}
                              className="text-white text-3xl hover:text-gray-400"
                            />
                          </div>
                        </div>
                        <h3 className="font-semibold text-white pl-4 hover:text-yellow-400 cursor-pointer">
                          {movie.title}
                        </h3>
                        <p className="pl-4 text-sm text-gray-500">
                          {movie.original_title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="top-[40%] left-[-10px]" />
              <CarouselNext className="top-[40%] right-[-5px]" />
            </Carousel>
          </div>
        </div>
        {/* Phim Trung Quốc mới */}
        <div className="flex justify-start mt-2">
          <div className="w-[18%] h-[270px] flex flex-col justify-center">
            <h1 className="pl-4 w-[80%] font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#cbd853] to-[#b6b2b2]">
              Phim Trung Quốc mới
            </h1>
            <p className="text-sm pl-4 hover:text-yellow-400 text-white mt-2 cursor-pointer">
              Xem toàn bộ <ChevronRight size={15} className="inline-block" />
            </p>
          </div>
          <div className="w-[82%] h-[270px]">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div className="flex">
                    {movies.slice(0, 3).map((movie, index) => (
                      <div key={index} className="h-full px-2 w-[33%]">
                        <div className="relative w-full h-[200px] group overflow-hidden rounded-lg">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt= {`${movie.title}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 "
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <FontAwesomeIcon
                              icon={faCirclePlay}
                              className="text-white text-3xl hover:text-gray-400"
                            />
                          </div>
                        </div>
                        <h3 className="font-semibold text-white pl-4 hover:text-yellow-400 cursor-pointer">
                          {movie.title}
                        </h3>
                        <p className="pl-4 text-sm text-gray-500">
                          {movie.original_title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex">
                    {movies.slice(6, 9).map((movie, index) => (
                      <div key={index} className="h-full px-2 w-[33%]">
                        <div className="relative w-full h-[200px] group overflow-hidden rounded-lg">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt= {`${movie.title}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 "
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <FontAwesomeIcon
                              icon={faCirclePlay}
                              className="text-white text-3xl hover:text-gray-400"
                            />
                          </div>
                        </div>
                        <h3 className="font-semibold text-white pl-4 hover:text-yellow-400 cursor-pointer">
                          {movie.title}
                        </h3>
                        <p className="pl-4 text-sm text-gray-500">
                          {movie.original_title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="top-[40%] left-[-10px]" />
              <CarouselNext className="top-[40%] right-[-5px]" />
            </Carousel>
          </div>
        </div>
        {/* Phim Nhật Bản mới */}
        <div className="flex justify-start mt-2">
          <div className="w-[18%] h-[240px] flex flex-col justify-center">
            <h1 className="pl-4 w-[80%] font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#cf35a1] to-[#b6b2b2]">
              Phim Nhật Bản mới
            </h1>
            <p className="text-sm pl-4 hover:text-yellow-400 text-white mt-2 cursor-pointer">
              Xem toàn bộ <ChevronRight size={15} className="inline-block" />
            </p>
          </div>
          <div className="w-[82%] h-[240px]">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div className="flex">
                    {movies.slice(0, 3).map((movie, index) => (
                      <div key={index} className="h-full px-2 w-[33%]">
                        <div className="relative w-full h-[200px] group overflow-hidden rounded-lg">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt= {`${movie.title}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 "
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <FontAwesomeIcon
                              icon={faCirclePlay}
                              className="text-white text-3xl hover:text-gray-400"
                            />
                          </div>
                        </div>
                        <h3 className="font-semibold text-white pl-4 hover:text-yellow-400 cursor-pointer">
                          {movie.title}
                        </h3>
                        <p className="pl-4 text-sm text-gray-500">
                          {movie.original_title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex">
                    {movies.slice(6, 9).map((movie, index) => (
                      <div key={index} className="h-full px-2 w-[33%]">
                        <div className="relative w-full h-[200px] group overflow-hidden rounded-lg">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt= {`${movie.title}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 "
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <FontAwesomeIcon
                              icon={faCirclePlay}
                              className="text-white text-3xl hover:text-gray-400"
                            />
                          </div>
                        </div>
                        <h3 className="font-semibold text-white pl-4 hover:text-yellow-400 cursor-pointer">
                          {movie.title}
                        </h3>
                        <p className="pl-4 text-sm text-gray-500">
                          {movie.original_title}
                        </p>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="top-[40%] left-[-10px]" />
              <CarouselNext className="top-[40%] right-[-5px]" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesByRegion;
