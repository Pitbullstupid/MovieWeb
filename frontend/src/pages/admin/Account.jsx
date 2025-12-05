import React, { useState } from 'react'
import DataTable from '@/components/DataTable'
import { Button } from '@/components/ui/button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { userColumns } from '@/lib/data'
import axios from 'axios'
import { toast } from 'sonner'
import UserModalForm from '@/components/UserModalForm'
import UserExcel from '@/components/GeneratePdf/UserExcel'
const Account = ({ userList, refreshUsers }) => {
  const [openModal, setOpenModal] = useState(false);
    const [openModalPdf, setOpenModalPdf] = useState(false);
  const handleAdd = async (userData) => {
    try {
      await axios.post("http://localhost:5001/api/users/", userData);
      toast.success("Thêm người dùng thành công!");
      refreshUsers();
    } catch (err) {
      console.error(err);
      toast.error("Thêm người dùng thất bại!");
    }
  }
  const handleUpdateUser = async (id, userData) => {
    if (!id || !userData) return;
    try {
      await axios.put(`http://localhost:5001/api/users/${id}`, userData);
      toast.success("Sửa người dùng thành công!");
      refreshUsers();
    } catch (err) {
      console.error("Lỗi khi sửa người dùng:", err);
      toast.error("Sửa người dùng thất bại!");
    }
  };
  const deleteUser = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/users/${id}`);
      toast.success("Xoá người dùng thành công!");
      refreshUsers();
    } catch (error) {
      console.log("Lỗi khi xóa User:", err);
      toast.error("Xóa người dùng thất bại!");
    }
  }
  return (
    <>
      <div className='ml-16 flex flex-col items-center mt-[63px]'>
        <div className='mt-4 w-[96%]'>
          {/* Title */}
          <div >
            <p className='text-white font-bold text-3xl'>Quản lý người dùng</p>
          </div>

          {/* Search + Buttons */}
          <div className='mt-10 flex justify-end'>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="default" className="border-2 border-[#2F2F2F] bg-[#181A1F] text-white hover:opacity-90" onClick={() => setOpenModalPdf(true)}>
                <FontAwesomeIcon icon={faPrint} /> Tạo bản in
              </Button>
              <Button variant="outline" className="hover:opacity-90" onClick={() => setOpenModal(true)}>
                <FontAwesomeIcon icon={faSquarePlus} /> Thêm mới
              </Button>
            </div>
          </div>

          {/* DataTable */}
          <div className='mt-4'>
            <DataTable data={userList} columns={userColumns} searchKey="userName" deleteUser={deleteUser} handleUpdateUser={handleUpdateUser} />
          </div>
        </div>
        {/* Modal thêm */}
        <UserModalForm open={openModal} onOpenChange={setOpenModal} onSubmit={handleAdd} users={userList} mode="add" />
      </div>
      <UserExcel data={userList} openModalPdf={openModalPdf} setOpenModalPdf={setOpenModalPdf}/>
    </>
  )
}

export default Account
