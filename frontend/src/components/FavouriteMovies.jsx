import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

const FavouriteMovies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);

  const userId = localStorage.getItem("userId");
  const user = userList?.find((u) => u._id === userId);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/movies");
        const data = await res.json();
        setMoviesData(Array.isArray(data) ? data : []);
      } catch {
        setMoviesData([]);
      }
    };
    fetchMovies();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users");
        const data = await res.json();
        setUserList(data);
      } catch (err) {
        console.error("Lỗi khi lấy user:", err);
      }
    };
    fetchUsers();
  }, []);

  // Favour filter
  const favouriteMovies = user
    ? moviesData.filter((m) => user.favoriteMovies.includes(m.movieId))
    : [];

  // Remove
  const handleRemove = async (movieId) => {
    if (!user) return;

    const newFavouriteList = user.favoriteMovies.filter((id) => id !== movieId);
    toast.info("Đã xóa khỏi danh sách yêu thích");

    try {
      const response = await fetch(`http://localhost:5001/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favoriteMovies: newFavouriteList }),
      });

      if (!response.ok) throw new Error("Cập nhật thất bại");

      setUserList((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, favoriteMovies: newFavouriteList } : u
        )
      );
    } catch (error) {
      toast.error("Lỗi khi cập nhật danh sách yêu thích!");
    }
  };

  // Pagination
  const totalPages = Math.ceil(favouriteMovies.length / 8);

  useEffect(() => {
    setPage(1);
  }, [user]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const visibleMovies = favouriteMovies.slice((page - 1) * 8, page * 8);

  // Scroll top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div>
      <h1 className="text-white font-semibold text-[20px] pb-5">Phim yêu thích</h1>
      <div className="w-full min-h-165 mt-4 bg-[#272A39]">
        <div className="flex w-full h-[500px] mt-4 items-start flex-wrap space-y-4">
          {favouriteMovies.length === 0 ? (
            <p className="text-white text-lg mt-10 mx-[35%]">
              Không có phim nào trong danh sách yêu thích.
            </p>
          ) : (
            visibleMovies.map((movie) => (
              <div
                key={movie.movieId}
                className="flex flex-col justify-center items-center w-1/4 relative"
              >
                <Link to={`/phim/${movie.original_title}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.original_title}
                    className="w-[200px] h-[300px] rounded-2xl"
                  />
                  <p className="text-white hover:text-yellow-400">
                    {truncate(movie.title || movie.original_title, 25)}
                  </p>
                  <p className="text-[#5E5F64] text-sm">
                    {truncate(movie.original_title, 10)}
                  </p>
                </Link>
                <div className="w-8 h-8 rounded-full bg-white absolute top-2 right-7 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => handleRemove(movie.movieId)}
                  />
                </div>
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
    </div>
  );
};

export default FavouriteMovies;
