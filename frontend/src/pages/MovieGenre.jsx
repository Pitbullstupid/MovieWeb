import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { genreMap, movies } from "@/lib/data";
import Pagination from "@/components/Pagination";
import AnimatedPage from "@/components/AnimatedPage";
import Footer from "@/components/Footer";
const MovieGenre = () => {
  const { slug } = useParams(); //nhận id
  const genre = genreMap[Number(slug)];
  const [page, setPage] = useState(1);
  //kéo trang lên đầu
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [genre, page]);

  //lọc phim theo id
  const moviesByGenre = movies.filter((m) =>
    m.genre_ids.includes(Number(slug))
  );
  //Pagination
  const totalPages = Math.ceil(moviesByGenre.length / 18);
  //chuyển về trang 1 khi id thay đổi
  useEffect(() => {
    setPage(1);
  }, [slug]);
  //Btn next
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  //Btn prev
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  //xử lý khi thay đổi page
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const visibleMovies = moviesByGenre.slice((page - 1) * 18, page * 18);
  return (
    <>
      <Header />
      <AnimatedPage>
        <div className="w-full min-h-[1150px] mt-4 bg-[#191B24]">
          {/* Genre */}
          <h1 className="text-white font-semibold text-2xl ml-4 pt-20">
            Thể loại : {genre}
          </h1>
          {/* Movie */}
          <div className="flex w-full h-[500px] mt-4 items-start flex-wrap space-y-4">
            {moviesByGenre.length === 0 ? (
                <p className="text-white text-lg mt-10 mx-[35%]">
                  Không có phim nào trong thể loại này.
                </p>
            ) : (
              visibleMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex flex-col justify-center items-center w-1/6"
                >
                  <Link to={`/phim/${movie.original_title}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.original_title}
                      className="w-[200px] h-[300px] rounded-2xl"
                    />
                    <p className="text-white hover:text-yellow-400">
                      {movie.title || movie.original_title}
                    </p>
                    <p className="text-[#5E5F64] text-sm">
                      {movie.original_title}
                    </p>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Pagination */}
        <Pagination
          handleNext={handleNext}
          handlePrev={handlePrev}
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
        />
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default MovieGenre;
