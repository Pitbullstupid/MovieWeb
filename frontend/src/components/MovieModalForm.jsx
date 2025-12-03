import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { genreMap } from "@/lib/data";



const MovieModalForm = ({ open, onOpenChange, onSubmit, initialData, movies = [], mode = "add" }) => {
  const [formData, setFormData] = useState({
    movieId: "",
    title: "",
    original_title: "",
    overview: "",
    genre_ids: "",
    poster_path: "",
    backdrop_path: "",
    release_date: "",
    original_language: "",
    adult: false,
    video: false,
    popularity: "",
    vote_average: "",
    vote_count: "",
  });

  // Load initialData + format release_date
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        release_date: initialData.release_date
          ? initialData.release_date.slice(0, 10) // ISO → yyyy-MM-dd
          : "",
        genre_ids: Array.isArray(initialData.genre_ids)
          ? initialData.genre_ids.join(",")
          : initialData.genre_ids || "",
      });
    }
  }, [initialData]);

  // Handle input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields
    if (!formData.movieId || !formData.title || !formData.release_date) {
      toast.error("movieId, title và release_date không được để trống!");
      return;
    }

    // number validates
    const movieIdNum = Number(formData.movieId);
    const popularityNum = Number(formData.popularity || 0);
    const voteAverageNum = Number(formData.vote_average || 0);
    const voteCountNum = Number(formData.vote_count || 0);

    if (isNaN(movieIdNum) || isNaN(popularityNum) || isNaN(voteAverageNum) || isNaN(voteCountNum)) {
      toast.error("movieId, popularity, vote_average, vote_count phải là số!");
      return;
    }

    // vote_average <= 10
    if (voteAverageNum > 10) {
      toast.error("vote_average phải nhỏ hơn hoặc bằng 10!");
      return;
    }

    // Check duplicate movieId
    const isDuplicate = movies.some(
      (m) => m.movieId === movieIdNum && m.movieId !== initialData?.movieId
    );

    if (isDuplicate) {
      toast.error("movieId đã tồn tại, vui lòng nhập giá trị khác!");
      return;
    }

    // Validate genre_ids theo genreMap
    let genreIdsArray = [];
    if (formData.genre_ids) {
      try {
        genreIdsArray = formData.genre_ids.split(",").map((v) => {
          const num = Number(v.trim());
          if (isNaN(num) || !genreMap[num]) throw new Error();
          return num;
        });
      } catch {
        toast.error("genre_ids chứa giá trị không hợp lệ hoặc không tồn tại trong genreMap!");
        return;
      }
    }

    // Validate release date
    const releaseDateObj = new Date(formData.release_date);
    if (isNaN(releaseDateObj.getTime())) {
      toast.error("release_date không hợp lệ!");
      return;
    }

    const payload = {
      ...formData,
      movieId: movieIdNum,
      genre_ids: genreIdsArray,
      popularity: popularityNum,
      vote_average: voteAverageNum,
      vote_count: voteCountNum,
      release_date: releaseDateObj.toISOString(),
      updatedAt: new Date().toISOString(),
      createdAt: mode === "add" ? new Date().toISOString() : initialData.createdAt,
    };

    onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === "edit" ? "Chỉnh sửa phim" : "Thêm phim mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 pr-2">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4">
            <div>
              <Label>Movie ID</Label>
              <Input name="movieId" onChange={handleChange} value={formData.movieId} placeholder="1267319" />
            </div>

            <div>
              <Label>Title</Label>
              <Input name="title" onChange={handleChange} value={formData.title} />
            </div>

            <div>
              <Label>Original Title</Label>
              <Input name="original_title" onChange={handleChange} value={formData.original_title} />
            </div>

            <div>
              <Label>Ngày phát hành</Label>
              <Input type="date" name="release_date" onChange={handleChange} value={formData.release_date} />
            </div>

            <div>
              <Label>Ngôn ngữ gốc</Label>
              <Input
                name="original_language"
                onChange={handleChange}
                value={formData.original_language}
                placeholder="en, ko..."
              />
            </div>

            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.adult}
                  onCheckedChange={(v) => setFormData({ ...formData, adult: v })}
                />
                <Label>Adult</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.video}
                  onCheckedChange={(v) => setFormData({ ...formData, video: v })}
                />
                <Label>Video</Label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            <div>
              <Label>Thể loại (genre_ids)</Label>
              <Input name="genre_ids" placeholder="28,80,53" onChange={handleChange} value={formData.genre_ids} />
            </div>

            <div>
              <Label>Poster Path</Label>
              <Input name="poster_path" placeholder="/abc.jpg" onChange={handleChange} value={formData.poster_path} />
            </div>

            <div>
              <Label>Backdrop Path</Label>
              <Input
                name="backdrop_path"
                placeholder="/xyz.jpg"
                onChange={handleChange}
                value={formData.backdrop_path}
              />
            </div>

            <div>
              <Label>Popularity</Label>
              <Input name="popularity" onChange={handleChange} value={formData.popularity} />
            </div>

            <div>
              <Label>Vote Average</Label>
              <Input name="vote_average" onChange={handleChange} value={formData.vote_average} />
            </div>

            <div>
              <Label>Vote Count</Label>
              <Input name="vote_count" onChange={handleChange} value={formData.vote_count} />
            </div>
          </div>

          {/* FULL WIDTH */}
          <div className="col-span-2">
            <Label>Overview</Label>
            <Textarea name="overview" onChange={handleChange} value={formData.overview} />
          </div>

          <div className="col-span-2">
            <Button type="submit" className="w-full">
              {mode === "edit" ? "Lưu thay đổi" : "Thêm phim"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MovieModalForm;
