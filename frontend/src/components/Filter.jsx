import React, { useState, useMemo, useEffect } from "react";
import { Badge } from "./ui/badge";
import { genreMap, languageCountryMap, year } from "@/lib/data";
import { Link } from "react-router";
import Pagination from "@/components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

const Filter = ({ movies }) => {
  const arrangeOptions = ["Mới nhất", "Điểm IMDb", "Lượt xem"];
  const [page, setPage] = useState(1);
  const [customYear, setCustomYear] = useState("");
  const [selected, setSelected] = useState({
    country: {},
    genre: {},
    year: {},
    arrange: null,
  });

  // Hàm lọc movies
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Lọc theo quốc gia
    const selectedCountries = Object.keys(selected.country).filter(
      (id) => selected.country[id]
    );
    if (selectedCountries.length) {
      result = result.filter((movie) =>
        selectedCountries.includes(movie.original_language)
      );
    }

    // Lọc theo thể loại
    const selectedGenres = Object.keys(selected.genre).filter(
      (id) => selected.genre[id]
    );
    if (selectedGenres.length) {
      result = result.filter((movie) =>
        movie.genre_ids.some((gid) => selectedGenres.includes(String(gid)))
      );
    }

    // Lọc theo năm
    const selectedYears = Object.keys(selected.year).filter(
      (id) => selected.year[id]
    );
    if (selectedYears.length) {
      result = result.filter((movie) =>
        selectedYears.includes(
          new Date(movie.release_date).getFullYear().toString()
        )
      );
    }

    // Sắp xếp
    if (selected.arrange) {
      if (selected.arrange === "Mới nhất") {
        result.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      } else if (selected.arrange === "Điểm IMDb") {
        result.sort((a, b) => b.vote_average - a.vote_average);
      } else if (selected.arrange === "Lượt xem") {
        result.sort((a, b) => b.popularity - a.popularity);
      }
    }

    return result;
  }, [movies, selected]);

  const handleInput = (e) => {
    const value = e.target.value;
    const currentYear = new Date().getFullYear();

    if (!/^\d*$/.test(value)) {
      toast.error("Vui lòng nhập số năm hợp lệ!");
      return;
    }

    setCustomYear(value);

    // Validate
    if (value && Number(value) > currentYear) {
      toast.error(`Năm không vượt quá ${currentYear}`);
    }
    // Nhấn Enter -> thêm
    if (e.key === "Enter" && value && Number(value) <= currentYear) {
      setSelected((prev) => ({
        ...prev,
        year: { ...prev.year, [value]: true },
      }));
    }
  };
  //  tách phim
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const totalPages = Math.ceil(filteredMovies.length / 18);
  //chuyển về trang 1 khi id thay đổi
  useEffect(() => {
    setPage(1);
  }, [selected]);
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
  const visibleMovies = filteredMovies.slice((page - 1) * 18, page * 18);
  return (
    <div className=" w-full mt-4">
      <div className="w-[95%] mx-auto">
        {/* Quốc gia */}
        <div className="mt-2 ml-4 flex">
          <p className="font-semibold text-white w-[8%] mt-1">Quốc gia :</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(languageCountryMap).map(([id, name]) => (
              <Badge
                key={id}
                onClick={() =>
                  setSelected((prev) => ({
                    ...prev,
                    country: { ...prev.country, [id]: !prev.country[id] },
                  }))
                }
                className={`bg-[#23272f]/40 text-white rounded-lg px-2 py-1 text-base font-normal shadow-none border border-white/30 hover:text-default cursor-pointer ${
                  selected.country[id]
                    ? "border-default text-default"
                    : "border-white/30 text-white"
                }`}
              >
                {name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Thể loại */}
        <div className="mt-6 ml-4 flex">
          <p className="font-semibold text-white w-[16%] mt-1">Thể loại :</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(genreMap).map(([id, name]) => (
              <Badge
                key={id}
                onClick={() =>
                  setSelected((prev) => ({
                    ...prev,
                    genre: { ...prev.genre, [id]: !prev.genre[id] },
                  }))
                }
                className={`bg-[#23272f]/40 text-white rounded-lg px-2 py-1 text-base font-normal shadow-none border border-white/30 hover:text-default cursor-pointer ${
                  selected.genre[id]
                    ? "border-default text-default"
                    : "border-white/30 text-white"
                }`}
              >
                {name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Năm phát hành */}
        <div className="mt-6 ml-4 flex">
          <p className="font-semibold text-white w-[12.5%] mt-1">
            Năm phát hành :
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Top 10 năm */}
            {Object.entries(year)
              .sort((a, b) => b[0] - a[0])
              .slice(0, 10)
              .map(([id, name]) => (
                <Badge
                  key={id}
                  onClick={() =>
                    setSelected((prev) => ({
                      ...prev,
                      year: { ...prev.year, [id]: !prev.year[id] },
                    }))
                  }
                  className={`bg-[#23272f]/40 text-white rounded-lg px-2 py-1 text-base 
              font-normal shadow-none border cursor-pointer
              ${
                selected.year[id]
                  ? "border-default text-default"
                  : "border-white/30 text-white"
              }`}
                >
                  {name}
                </Badge>
              ))}

            {/* Ô nhập năm */}
            <div className="relative">
              {/* Icon search */}
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                inputMode="numeric"
                placeholder="Năm..."
                value={customYear}
                onChange={handleInput}
                onKeyDown={handleInput}
                className="w-28 bg-[#23272f]/40 text-white pl-8 pr-2 py-1 rounded-lg
                       border border-white/30 outline-none placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Sắp xếp */}
        <div className="mt-6 ml-4 flex">
          <p className="font-semibold text-white w-[8%] mt-1">Sắp xếp :</p>
          <div className="flex flex-wrap gap-3">
            {arrangeOptions.map((name) => (
              <Badge
                key={name}
                onClick={() =>
                  setSelected((prev) => ({
                    ...prev,
                    arrange: prev.arrange === name ? null : name,
                  }))
                }
                className={`bg-[#23272f]/40 text-white rounded-lg px-2 py-1 text-base font-normal shadow-none border border-white/30 hover:text-default cursor-pointer ${
                  selected.arrange === name
                    ? "border-default text-default"
                    : "border-white/30 text-white"
                }`}
              >
                {name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Movies */}
      <div className="w-full mx-auto min-h-[1050px] mt-10 bg-[#272A39]">
        <div className="flex w-full h-[500px] mt-4 items-start flex-wrap space-y-4">
          {filteredMovies.length === 0 ? (
            <p className="text-white text-lg mt-10 inline-block mx-auto">
              Không có phim nào :((
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
      </div>
      <Pagination
        handleNext={handleNext}
        handlePrev={handlePrev}
        handlePageChange={handlePageChange}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Filter;
