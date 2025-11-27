import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@/components/Pagination";
import AnimatedPage from "@/components/AnimatedPage";
import Footer from "@/components/Footer";
import { Spinner } from "@/components/ui/spinner";
import LoadingOverlay from "@/components/LoadingOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Filter from "@/components/Filter";

const Search = () => {
  const { slug } = useParams();
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);
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
  //tìm phim
  const searchMovie = moviesData.filter((m) => {
    const keyword = slug.toLowerCase();
    return (
      m.title?.toLowerCase().includes(keyword) ||
      m.original_title?.toLowerCase().includes(keyword)
    );
  });

  const [page, setPage] = useState(1);
  //kéo trang lên đầu
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [moviesData, page]);

  //Pagination
  const totalPages = Math.ceil(searchMovie.length / 18);
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
  const visibleMovies = searchMovie.slice((page - 1) * 18, page * 18);
  return (
    <>
    <LoadingOverlay loading={loading}/>
        <Header movies={moviesData}/>
          <AnimatedPage>
            <div className="w-[97%] mx-auto min-h-[1200px] mt-4 bg-[#272A39] ">
              {/* title */}
              { selected ?(
                <h1 className="text-white font-semibold text-2xl ml-4 pt-20">
                Kết quả tìm kiếm theo bộ lọc
              </h1>
              ): (
                <h1 className="text-white font-semibold text-2xl ml-4 pt-20">
                Kết quả tìm kiếm của : {slug}
              </h1>
              )}
              <button className="flex justify-center items-center ml-4 mt-2 gap-1 text-white cursor-pointer" onClick={() => setSelected(prev => !prev)}>
                <FontAwesomeIcon 
                  icon={faFilter}
                  className={`text-xl ${selected ? "text-default" : "text-white"}`}
                />
                <p>Bộ lọc</p>
              </button>
              {selected &&(
                <Filter 
                movies = {moviesData}
                />
              )}
              {/* Movie */}
              {!selected && (
                <div className="flex w-full h-[500px] mt-4 items-start flex-wrap space-y-4">
                {searchMovie.length === 0 ? (
                  <p className="text-white text-lg mt-10 inline-block mx-auto">
                    Không có phim nào .
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
                          className="w-[220px] h-[290px] rounded-2xl"
                        />
                        <p className="text-white hover:text-yellow-400 truncate max-w-[190px]">
                          {movie.title || movie.original_title}
                        </p>
                        <p className="text-[#5E5F64] text-sm truncate max-w-[190px]">
                          {movie.original_title}
                        </p>
                      </Link>
                    </div>
                  ))
                )}
              </div>
              )}
            </div>
            {/* Pagination */}
            {!selected && (
              <Pagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            )}
            <Footer />
          </AnimatedPage>
    </>
  );
};

export default Search;
