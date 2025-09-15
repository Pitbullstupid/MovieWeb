import mongoose from "mongoose";


const movieSchema = new mongoose.Schema(
  {
    // id từ TMDB
    movieId: {
      type: Number,
      required: true,
      unique: true, //chi co 1 id
    },
    
  // title có thể null => không required
    title: {
      type: String,
    },
    original_title: {
      type: String,
      required: true,
    },
    //tóm tắt nd phim
    overview: {
      type: String,
    },
    //ảnh phim
    poster_path: {
      type: String,
    },
    //ảnh nền
    backdrop_path: {
      type: String,
    },
    //ngày phát hành phim(null)
    release_date: {
      type: Date,
    },
    genre_ids: [
      {
        type: Number, // ví dụ: 28 = Action, 16 = Animation...
      },
    ],
    //điểm đánh giá trung bình
    vote_average: {
      type: Number,
      default: 0,
    },
    //tổng số lượt bình chọn
    vote_count: {
      type: Number,
      default: 0,
    },
    //số lượt truy cập
    popularity: {
      type: Number,
      default: 0,
    },
    //ngôn ngữ gốc của phim
    original_language: {
      type: String,
    },
    //Phim tag 18+
    adult: {
      type: Boolean,
      default: false,
    },
    //movie hoặc trailer
    video: {
      type: Boolean,
      default: false,
    },
  },
  //tự thêm createdAt và updatedAt
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;