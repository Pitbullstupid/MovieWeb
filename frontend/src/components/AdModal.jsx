import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const AdModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLogin") === "true";
    setIsLogin(loggedIn);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  const handleUpgrade = () => {
    !isLogin
      ? (toast.error("Bạn cần đăng nhập trước khi nâng cấp tài khoản!"),
        setOpen(false))
      : (navigate(`/user/premium/${user._id}`), setOpen(false));
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      center
      styles={{
        modal: {
          background: "#1e1e2d",
          color: "white",
          borderRadius: "20px",
          textAlign: "center",
          maxWidth: "500px",
        },
      }}
    >
      <h2 className="text-2xl font-bold mb-4 mt-2 text-[#FFD875]">
        <FontAwesomeIcon icon={faCrown} className="text-[#FFD875] ml-2" /> Ưu
        đãi đặc biệt!
      </h2>
      <p className="text-lg mb-6">
        Nâng cấp lên <span className="text-[#FFD875] font-bold">Premium</span>{" "}
        để xem phim chất lượng cao không quảng cáo!
      </p>
      {/* <img
        src="/sticker(2).webp"
        alt="Quảng cáo Premium"
        className="rounded-xl mb-6 mx-auto w-[300px]"
      /> */}
      <div className="flex gap-4 justify-center mb-4">
        <button
          onClick={handleUpgrade}
          className="bg-[#FFD875] text-black px-4 py-2 rounded-lg hover:opacity-85 transition-all"
        >
          Nâng cấp
        </button>
        <button
          onClick={() => setOpen(false)}
          className="bg-[#FFD875] text-black px-7 py-2 rounded-lg hover:opacity-85 transition-all"
        >
          Đóng
        </button>
      </div>
    </Modal>
  );
};

export default AdModal;
