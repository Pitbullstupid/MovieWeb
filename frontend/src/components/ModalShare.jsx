import React from "react";
import Modal from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faFacebookMessenger,
  faReddit,
  faTelegramPlane,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { toast } from "sonner";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
const ModalShare = ({open, onClose, slug}) => {
  // Share
  const btnShare = () => {
    toast.success("Chia sẻ thành công");
    onClose();
  };
  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:5173/phim/${slug}`);
    toast.success("Đã lưu link phim vào clipboard");
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="w-106 h-30 bg-[#2A314E]">
        <div className="pt-2 pl-2 text-white font-semibold text-[17px]">
          Chia sẻ
        </div>
        <div className="mt-3 ml-5 flex items-center gap-5">
          <button
            className="w-fit bg-[#3D5C9E]  rounded-xl hover:-translate-y-1 transition-transform duration-100"
            onClick={btnShare}
          >
            <FontAwesomeIcon
              icon={faFacebookF}
              className="text-white py-[6px] px-[2px] text-[35px] "
            />
          </button>
          <button
            className="w-fit bg-black  rounded-xl hover:-translate-y-1 transition-transform duration-100"
            onClick={btnShare}
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-white py-[6px] px-[2px] text-[35px] "
            />
          </button>
          <button
            className="w-fit bg-[#0088cc]  rounded-xl hover:-translate-y-1 transition-transform duration-100"
            onClick={btnShare}
          >
            <FontAwesomeIcon
              icon={faTelegramPlane}
              className="text-white py-[10px] px-[8px] text-[25px] "
            />
          </button>
          <button
            className="w-fit bg-[#ff4500]  rounded-xl hover:-translate-y-1 transition-transform duration-100"
            onClick={btnShare}
          >
            <FontAwesomeIcon
              icon={faReddit}
              className="text-white py-[10px] px-[8px] text-[25px] "
            />
          </button>
          <button
            className="w-fit bg-[#448AFF]  rounded-xl hover:-translate-y-1 transition-transform duration-100"
            onClick={btnShare}
          >
            <FontAwesomeIcon
              icon={faFacebookMessenger}
              className="text-white py-[10px] px-[8px] text-[25px] "
            />
          </button>
          <button
            className="w-fit bg-[#95D03A]  rounded-xl hover:-translate-y-1 transition-transform duration-100"
            onClick={handleShare}
          >
            <FontAwesomeIcon
              icon={faShareNodes}
              className="text-white py-[12px] px-[10px] text-[20px] "
            />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShare;
