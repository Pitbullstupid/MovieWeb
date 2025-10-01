import AnimatedPage from "@/components/AnimatedPage";
import Header from "@/components/Header";
import { genreMap } from "@/lib/data"; 
import React, { useEffect, useState } from "react";
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
import ReactPlayer from "react-player/youtube";

const WatchMovie = () => {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug || "")
    .trim()
    .normalize("NFC")
    .toLowerCase();

  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null); 

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

  // fetch trailer từ TMDB
  const fetchMovieTrailer = async () => {
    if (!movie) return;
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      };
      const urlTrailer = `https://api.themoviedb.org/3/movie/${movie.movieId}/videos?language=en-US`;
      const responseTrailer = await fetch(urlTrailer, options);
      const trailerData = await responseTrailer.json();
      const trailer = trailerData.results.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );
      setTrailerKey(trailer ? trailer.key : null); // ✅ check null
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerKey(null);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovieTrailer();
  }, [slug, moviesData]);

  if (loading) return <div className="text-center p-10">Đang tải phim...</div>;
  if (!movie) return <div className="p-10 text-white">Không tìm thấy phim</div>;

  return (
    <>
      <Header />
      <AnimatedPage>
        <div className="pt-[20px] w-full bg-[#191B24]">
          {/* title */}
          <div className="mt-20 ml-10 mb-4 flex text-white items-center space-x-2">
            <Link to={`/phim/${movie.original_title}`}>
              <FontAwesomeIcon icon={faCircleChevronLeft} className="w-5" />
            </Link>
            <h1 className=" font-semibold">
              Xem phim {movie.title || movie.original_title}
            </h1>
          </div>

          {/* video */}
          <ReactPlayer
            url={
              trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : ""
            }
            controls
            width="90%"
            height="500px"
            className=" mx-auto rounded-t-2xl overflow-hidden"
          />

          {/* fav & share */}
          <div className="flex items-center justify-start w-[90%] gap-3 mx-auto bg-black border-t-[1.5px] border-gray-900 pt-2 pb-2 rounded-bl-2xl rounded-br-2xl">
            <div className="flex items-center gap-2 ml-2">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-white hover:text-yellow-400"
              />
              <p className="text-white mr-2">Yêu thích</p>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <FontAwesomeIcon
                icon={faShare}
                className="text-white hover:text-yellow-400"
              />
              <p className="text-white mr-2">Chia sẻ</p>
            </div>
          </div>

          {/* detail */}
          <div className="w-[90%] mx-auto mt-5 flex gap-5 pb-5">
            {/* poster */}
            <div className="w-[10%]">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.original_title}
                className="w-full h-fit rounded-2xl object-cover"
              />
            </div>

            {/* title & genre */}
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

            {/* overview */}
            <div className="w-[30%] space-y-3">
              <p className="text-sm text-[#5E5F64]">{movie.overview}</p>
              <Link to={`/phim/${movie.original_title}`}>
                <p className="text-sm text-yellow-400 cursor-pointer">
                  Thông tin phim{" "}
                  <ChevronRight size={15} className="inline-block" />
                </p>
              </Link>
            </div>

            {/* evaluate */}
            <div>
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
        </div>
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default WatchMovie;
