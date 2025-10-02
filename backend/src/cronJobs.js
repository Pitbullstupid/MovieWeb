import cron from "node-cron";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Movie from "./models/Movie.js";
import connectDB from "./config/db.js";

dotenv.config();

// Kết nối MongoDB
connectDB();

cron.schedule("0 0 * * *", async () => {
  console.log("Đang chạy cron job (mỗi ngày)...");

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    };

    let allMovies = [];

    // Lấy 5 trang (~100 phim)
    for (let page = 1; page <= 15; page++) {
      const url = `https://api.themoviedb.org/3/movie/now_playing?language=vi&page=${page}`;
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
        allMovies = allMovies.concat(data.results);
      }
    }

    if (allMovies.length > 0) {
      for (const movie of allMovies) {
        await Movie.updateOne(
          { movieId: movie.id },
          {
            $set: {
              movieId: movie.id,
              title: movie.title,
              original_title: movie.original_title,
              overview: movie.overview,
              poster_path: movie.poster_path,
              backdrop_path: movie.backdrop_path,
              release_date: movie.release_date,
              genre_ids: movie.genre_ids,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
              popularity: movie.popularity,
              original_language: movie.original_language,
              adult: movie.adult,
              video: movie.video,
            },
          },
          { upsert: true }
        );
      }
      console.log(`Đã cập nhật ${allMovies.length} phim thành công!`);
    } else {
      console.log("Không có dữ liệu trả về từ TMDB");
    }
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu phim:", err);
  }
});
