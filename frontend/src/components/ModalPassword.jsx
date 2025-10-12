import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ModalPassword = ({ open, onClose, user, setUserList }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = async () => {
    if (!user) return toast.error("Không tìm thấy người dùng");
    if (oldPassword.trim() !== user.password) {
      return toast.error("Mật khẩu cũ không chính xác");
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      return toast.error("Xác nhận mật khẩu không khớp");
    }
    if (newPassword.trim() === oldPassword.trim()){
        return toast.error("Mật khẩu mới phải khác mật khẩu cũ");
    }
    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: newPassword.trim() }),
        }
      );
      const data = await response.json();
      toast.success("Đổi mật khẩu thành công!");
      onClose();
      setUserList((prev) => prev.map((u) => (u._id === data._id ? data : u)));
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi đổi mật khẩu!");
    }
  };

  return (
    <Modal open={open} onClose={onClose} center>
      <div className="w-100 flex bg-[#2A314E] h-96 rounded-[8px]">
        <div className="mt-5 ml-5 w-full">
          {/* Mật khẩu cũ */}
          <div className="mt-6 relative">
            <p className="text-[#AAAAAA] mb-2">Mật khẩu cũ</p>
            <Input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              className="w-[350px] text-white pr-10"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showOld ? faEyeSlash : faEye}
              onClick={() => setShowOld(!showOld)}
              className="absolute right-10 top-[42px] cursor-pointer text-[#AAAAAA] hover:text-white"
            />
          </div>

          {/* Mật khẩu mới */}
          <div className="mt-6 relative">
            <p className="text-[#AAAAAA] mb-2">Mật khẩu mới</p>
            <Input
              type={showNew ? "text" : "password"}
              value={newPassword}
              className="w-[350px] text-white pr-10"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showNew ? faEyeSlash : faEye}
              onClick={() => setShowNew(!showNew)}
              className="absolute right-10 top-[42px] cursor-pointer text-[#AAAAAA] hover:text-white"
            />
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="mt-6 relative">
            <p className="text-[#AAAAAA] mb-2">Xác nhận mật khẩu mới</p>
            <Input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              className="w-[350px] text-white pr-10"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={showConfirm ? faEyeSlash : faEye}
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-10 top-[42px] cursor-pointer text-[#AAAAAA] hover:text-white"
            />
          </div>

          {/* update or exit */}
          <div className="flex justify-end gap-3 mt-5 mr-3">
            <button
              className="bg-[#FFD875] px-[15px] py-[5px] rounded-xl font-semibold mt-5 hover:opacity-90 text-sm"
              onClick={handleChangePassword}
            >
              Cập nhật
            </button>
            <button
              className="bg-white px-[15px] py-[5px] rounded-xl font-semibold mt-5 hover:opacity-90 text-sm"
              onClick={onClose}
            >
              Thoát
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPassword;
