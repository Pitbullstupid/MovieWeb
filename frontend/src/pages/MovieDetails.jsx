import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { movies, genreMap, languageCountryMap } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart,
  faShare,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import AnimatedPage from "@/components/AnimatedPage";
import Footer from "@/components/Footer";

const MovieDetails = () => {
  const { slug } = useParams();
  const movie = movies.find((m) => m.original_title === slug);

  useEffect(() => {
    window.scrollTo(0, 400);
  }, [slug]);

  return (
    <>
      {/* Header luôn sticky */}
      <Header />
      <AnimatedPage>
        {/* banner */}
        <div className="relative w-full h-[500px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.original_title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191B24] via-[#272A39]/5 to-transparent pointer-events-none"></div>
        </div>

        {/* section */}
        <div className="w-full min-h-screen bg-[#191B24] flex">
          {/* detail */}
          <div className="w-[40%] mt-8 ml-8 flex flex-col gap-2">
            {/* Banner */}
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.original_title}
              className="w-[160px] h-[240px] rounded-2xl"
            />
            {/* Title */}
            <h1 className="font-semibold text-2xl text-white w-[70%]">
              {movie.title || movie.original_title}
            </h1>
            <p className="mt-[-5px] text-[#D4B566] w-[80%]">
              {movie.original_title}
            </p>
            {/* Category */}
            <div className="flex flex-wrap gap-2 w-[70%]">
              {movie.genre_ids?.map((gid) => (
                <Badge
                  key={gid}
                  className="bg-[#23272f]/40 text-white rounded-lg px-3 py-1 text-sm font-normal shadow-none border border-white/30 hover:text-yellow-300 cursor-pointer"
                >
                  {genreMap[gid]}
                </Badge>
              ))}
            </div>
            {/* Overview */}
            <div>
              <p className="text-white font-semibold">Giới thiệu:</p>
              <p className="text-sm text-[#5E5F64] w-[80%]">{movie.overview}</p>
            </div>
            {/* Country */}
            <div className="flex gap-2 items-center">
              <p className="text-white font-semibold">Quốc gia:</p>
              <p className="text-sm font-semibold text-[#b6b8c0] w-[80%]">
                {languageCountryMap[movie.original_language]}
              </p>
            </div>
            {/* Release */}
            <div className="flex gap-2 items-center">
              <p className="text-white font-semibold whitespace-nowrap">
                Ngày ra mắt:
              </p>
              <p className="text-sm font-semibold text-[#b6b8c0] w-[80%]">
                {new Date(movie.release_date).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          {/* Direction */}
          <div className="flex items-start mt-8 gap-8">
            <button className="w-[200px] flex items-center justify-center h-14 rounded-full bg-gradient-to-r from-[#face5c] to-[#FFEBB7] text-white hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_15px_4px_rgba(250,206,92,0.8)] cursor-pointer">
              <FontAwesomeIcon icon={faPlay} className="text-black text-xl" />
              <p className="text-black text-xl ml-2">Xem ngay</p>
            </button>

            <button className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-[#23272f]/40 transition cursor-pointer">
              <FontAwesomeIcon
                icon={faHeart}
                className="mx-auto text-white text-2xl pt-[2px] hover:text-yellow-400"
              />
              <p className="w-full whitespace-nowrap text-white text-sm font-semibold">
                Yêu thích
              </p>
            </button>

            <button className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-[#23272f]/40 transition cursor-pointer">
              <FontAwesomeIcon
                icon={faShare}
                className="mx-auto text-white text-2xl pt-[2px] hover:text-yellow-400"
              />
              <p className="w-full whitespace-nowrap text-white text-sm font-semibold">
                Chia sẻ
              </p>
            </button>

            <button className="w-[150px] h-[40px] flex items-center gap-2 justify-center rounded-full bg-[#3556B6] ml-[150px]">
              <FontAwesomeIcon
                icon={faCertificate}
                className="text-white text-xl"
              />
              <p className="text-white text-xl flex items-center gap-1 font-bold">
                {movie.vote_average}{" "}
                <span className="text-sm font-normal">đánh giá</span>
              </p>
            </button>
          </div>
        </div>
        <Footer/>
      </AnimatedPage>
    </>
  );
};

export default MovieDetails;
