import React from "react";
import Modal from "react-responsive-modal";
import { avatars } from "@/lib/data";

const ModalAvatar = ({ open, onClose, onUpdate, setUserAvatar }) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="w-150 flex bg-[#2A314E]">
        <div className="mt-5 ml-5">
          <h1 className="text-white font-semibold">Đổi ảnh đại diện</h1>
          <div className="w-full flex flex-wrap">
            {avatars.map((avt, index) => (
              <div key={index} className="m-3">
                <img
                  src={avt}
                  alt={`Avatar ${index + 1}`}
                  tabIndex={0}
                  className="w-20 h-20 rounded-full cursor-pointer hover:opacity-90 focus:ring-2 ring-offset-2 ring-[#4f34eb]"
                  onClick={() => setUserAvatar(avt)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 mb-3 mr-3">
            <button
              className="bg-[#FFD875] px-[15px] py-[5px] rounded-xl font-semibold mt-5 hover:opacity-90 text-sm"
              onClick={() => {
                onUpdate();
                onClose();
              }}
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

export default ModalAvatar;
