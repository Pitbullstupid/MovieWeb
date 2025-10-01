import Movie from "../models/Movie.js"
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies)
    } catch (error) {
        console.log("Lỗi ghi get movies:", error);
        res.status(500).json({ message: "Lỗi server" })
    }
}

export const createMovies = async (req, res) => {
    try {
        let movies;

        if (Array.isArray(req.body)) {
            // Nếu req.body là mảng => thêm nhiều phim
            movies = await Movie.insertMany(req.body);
        } else {
            // Nếu req.body là object => thêm 1 phim
            const {
                movieId,
                title,
                original_title,
                overview,
                poster_path,
                backdrop_path,
                release_date,
                genre_ids,
                vote_average,
                vote_count,
                popularity,
                original_language,
                adult,
                video
            } = req.body;

            const movie = new Movie({
                movieId,
                title,
                original_title,
                overview,
                poster_path,
                backdrop_path,
                release_date,
                genre_ids,
                vote_average,
                vote_count,
                popularity,
                original_language,
                adult,
                video
            });

            movies = await movie.save();
        }

        res.status(200).json(movies);
    } catch (error) {
        console.error("Lỗi khi tạo phim:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};


export const updateMovies = async (req, res) => {
    try {
        const { 
            movieId,
            title, 
            original_title, 
            overview, poster_path, 
            backdrop_path, 
            release_date, 
            genre_ids, 
            vote_average, 
            vote_count, 
            popularity, 
            original_language, 
            adult, 
            video
         } = req.body;

        const updateMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { 
                movieId, 
                title, 
                original_title, 
                overview, 
                poster_path, 
                backdrop_path, 
                release_date, 
                genre_ids, 
                vote_average, 
                vote_count, 
                popularity, 
                original_language, 
                adult, 
                video },
            { new: true, runValidators: true }
        );

        if (!updateMovie) {
            return res.status(404).json({ message: 'không tìm thấy phim' });
        }

        res.status(200).json(updateMovie);
    } catch (error) {
        console.log("Lỗi khi cập nhật phim:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}

export const deleteMovies = async (req, res) => {
    try {
        const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deleteMovie) {
            return res.status(404).json({ message: 'không tìm thấy phim' });
        }
        res.status(200).json({ message: 'Xóa phim thành công' });
    } catch (error) {
        console.log("Lỗi khi xóa phim:", error);
        res.status(500).json({ message: "Lỗi server" });
    }

}