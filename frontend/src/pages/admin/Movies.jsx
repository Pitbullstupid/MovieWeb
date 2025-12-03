import React, { useState } from 'react'
import DataTable from '@/components/DataTable'
import { Button } from '@/components/ui/button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { movieColumns } from '@/lib/data'
import axios from 'axios'
import { toast } from 'sonner'
import MovieModalForm from '@/components/MovieModalForm'

const Movies = ({ movieList, refreshMovies }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleAdd = async (movieData) => {
    try {
      await axios.post("http://localhost:5001/api/movies", movieData);
      toast.success("Thêm phim thành công!");
      refreshMovies();
    } catch (err) {
      console.error(err);
      toast.error("Thêm phim thất bại!");
    }
  };
  const deleteMovie = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa phim này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/movies/${id}`);
      toast.success("Xóa phim thành công!");
      refreshMovies();
    } catch (err) {
      console.error("Lỗi khi xóa phim:", err);
      toast.error("Xóa phim thất bại!");
    }
  };
  const handleUpdateMovie = async (id, movieData) => {
    if (!id || !movieData) return;
    try {
      await axios.put(`http://localhost:5001/api/movies/${id}`, movieData);
      toast.success("Sửa phim thành công!");
      refreshMovies();
    } catch (err) {
      console.error("Lỗi khi sửa phim:", err);
      toast.error("Sửa phim thất bại!");
    }
  };
  const sortedMovies = [...movieList].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  return (
    <div className='ml-16 flex flex-col items-center mt-[63px]'>
      <div className='mt-4 w-[96%]'>

        <p className='text-white font-bold text-3xl'>Quản lý phim</p>

        <div className='mt-10 flex justify-end'>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="default" className="border-2 border-[#2F2F2F] bg-[#181A1F] text-white hover:opacity-90">
              <FontAwesomeIcon icon={faPrint} /> Tạo bản in
            </Button>
            <Button variant="outline" onClick={() => setOpenModal(true)}>
              <FontAwesomeIcon icon={faSquarePlus} /> Thêm mới
            </Button>
          </div>
        </div>

        <div className='mt-4'>
          <DataTable data={sortedMovies} columns={movieColumns} searchKey="title" deleteMovie={deleteMovie} handleUpdateMovie={handleUpdateMovie} />
        </div>
      </div>
      <MovieModalForm open={openModal} onOpenChange={setOpenModal} onSubmit={handleAdd} movies={movieList} mode="add" />

    </div>
  )
}

export default Movies
