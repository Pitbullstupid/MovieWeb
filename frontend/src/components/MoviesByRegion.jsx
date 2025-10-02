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
import { Link } from "react-router-dom";

const MoviesByRegion = ({ movies }) => {
  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  //QG
  const regions = [
    {
      code: "en",
      label: "Phim Mỹ mới",
      gradient: "from-[#6d459e] to-[#b6b2b2]",
    },
    {
      code: "es",
      label: "Phim Tây Ban Nha mới",
      gradient: "from-[#cbd853] to-[#b6b2b2]",
    },
    {
      code: "ja",
      label: "Phim Nhật Bản mới",
      gradient: "from-[#cf35a1] to-[#b6b2b2]",
    },
  ];

  const renderRegion = (region) => {
    // lọc theo QG và date
    const regionMovies = [...movies]
      .filter((m) => m.original_language === region.code)
      .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

    //chia thành 3
    const chunks = [];
    for (let i = 0; i < regionMovies.length; i += 3) {
      chunks.push(regionMovies.slice(i, i + 3));
    }

    return (
      <div key={region.code} className="flex justify-start mt-4">
        {/* Tiêu đề */}
        <div className="w-[18%] h-[270px] flex flex-col justify-center pb-10">
          <Link to={`/quoc-gia/${region.code}`}>
            <h1
              className={`pl-4 w-[80%] font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r ${region.gradient}`}
            >
              {region.label}
            </h1>
            <p className="text-sm pl-4 hover:text-yellow-400 text-white mt-2 cursor-pointer">
              Xem toàn bộ <ChevronRight size={15} className="inline-block" />
            </p>
          </Link>
        </div>

        {/* Carousel */}
        <div className="w-[82%] h-[270px]">
          <Carousel>
            <CarouselContent>
              {chunks.map((chunk, idx) => (
                <CarouselItem key={idx}>
                  <div className="flex">
                    {chunk.map((movie, index) => (
                      <div key={index} className="h-full px-2 w-[33%]">
                        <Link to={`/phim/${movie.original_title}`}>
                          <div className="relative w-full h-[200px] group overflow-hidden rounded-lg">
                            <img
                              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                              alt={movie.title}
                              className="w-full h-full object-cover  transform transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <FontAwesomeIcon
                                icon={faCirclePlay}
                                className="text-white text-3xl hover:text-gray-400"
                              />
                            </div>
                          </div>
                          <h3 className="font-semibold text-white pl-4 hover:text-yellow-400 cursor-pointer">
                            {truncate(movie.title || movie.original_title, 33)}
                          </h3>
                          <p className="pl-4 text-sm text-gray-500">
                            {truncate(movie.original_title, 20)}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="top-[40%] left-[-10px]" />
            <CarouselNext className="top-[40%] right-[-5px]" />
          </Carousel>
        </div>
      </div>
    );
  };

  return (
    <div className="flex p-6 bg-gradient-to-r from-black to-gray-900 w-full h-[930px]">
      <div className="bg-[#272A39] rounded-lg p-5 w-full">
        {regions.map(renderRegion)}
      </div>
    </div>
  );
};

export default MoviesByRegion;
