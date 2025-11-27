import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

const HistoryMovies = ({moviesData, loading}) => {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);

  const userId = localStorage.getItem("userId");
  const user = userList?.find((u) => u._id === userId);

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
  const watchedMovies = user
    ? moviesData.filter((m) => user.watchedMovies.includes(m.movieId))
    : [];
  const handleRemove = async (movieId) => {
    if (!user) return;
    const newWatchedList = user.watchedMovies.filter((id) => id !== movieId);
    toast.info("Đã xóa phim khỏi danh sách đã xem");

    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ watchedMovies: newWatchedList }),
        }
      );

      if (!response.ok) throw new Error("Cập nhật thất bại");

      setUserList((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, watchedMovies: newWatchedList } : u
        )
      );
    } catch (error) {
      toast.error("Lỗi khi cập nhật danh sách đã xem!");
    }
  };
  // Pagination
  const totalPages = Math.ceil(watchedMovies.length / 8);

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

  const visibleMovies = watchedMovies.slice((page - 1) * 8, page * 8);

  // Scroll top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <Spinner className="text-xl text-white" />
          <p className="mt-3 text-xl text-white">Đang lấy danh sách phim đã xem...</p>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-white font-semibold text-[20px] pb-5">
              Phim đã xem
            </h1>
            <div className="w-full min-h-200 mt-4 bg-[#272A39]">
              <div className="flex w-full h-[500px] mt-4 items-start flex-wrap space-y-4">
                {watchedMovies.length === 0 ? (
                  <p className="text-white text-lg mt-10 mx-[35%]">
                    Không có phim nào trong danh sách đã xem.
                  </p>
                ) : (
                  visibleMovies.map((movie) => (
                    <div
                      key={movie.movieId}
                      className="flex flex-col justify-center items-center w-1/4 relative"
                    >
                      <Link to={`/xem-phim/${movie.original_title}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt={movie.original_title}
                          className="w-[250px] h-[350px] rounded-2xl"
                        />
                        <p className="text-white hover:text-yellow-400 truncate max-w-[210px]">
                          {movie.title || movie.original_title}
                        </p>
                        <p className="text-[#5E5F64] text-sm truncate max-w-[210px]">
                          {movie.original_title}
                        </p>
                      </Link>
                      <div className="w-8 h-8 rounded-full bg-white absolute top-2 right-7 flex items-center justify-center cursor-pointer">
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
        </>
      )}
    </>
  );
};

export default HistoryMovies;
