import AnimatedPage from "@/components/AnimatedPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  faCheck,
  faChevronUp,
  faCrown,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { useParams } from "react-router";
import { toast } from "sonner";

const Premium = () => {
  const { slug } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [headerKey, setHeaderKey] = useState(0);
  // Lấy danh sách users từ backend
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users");
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
      }
    };
    fetchUsers();
  }, []);
  const handlePremium = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isPremium: true,
          }),
        }
      );
      const updatePremium = await response.json();
      toast.success("Nâng cấp tài khoản thành công");
      setUserList((prevUsers) =>
        prevUsers.map((u) => (u._id === updatePremium._id ? updatePremium : u))
      );
      setHeaderKey((prev) => prev + 1);
      setOpenModal(false);
    } catch (error) {
      console.error("Lỗi khi nâng cấp tài khoản:", error);
    }
  };
  // Tìm user theo id
  const user = userList?.find((u) => u._id === slug);
  return (
    <>
      <Header key={headerKey}/>
      <AnimatedPage>
        <div className="w-full mt-25 min-h-115">
          <div className="w-full">
            <h1 className="w-fit mx-auto text-white font-[Tektur] font-extrabold text-4xl ">
              Tài khoản Premium
            </h1>
            <p className="w-fit mx-auto text-[#AAAAAA] text-[16px] mt-2">
              Sở hữu tài khoản Premium để nhận nhiều quyền lợi và tăng trải
              ngiệm xem phim
            </p>
          </div>
          <div className="w-fit mx-auto mt-15 flex items-center justify-center gap-5">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={user?.Avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>Avt</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-white">
                {user?.userName}
                {user?.isPremium && (
                  <FontAwesomeIcon
                    icon={faCrown}
                    className="text-[#FFD875] ml-2"
                  />
                )}
                {!user?.isPremium && (
                  <FontAwesomeIcon
                    icon={faInfinity}
                    className="text-[#FFD875] ml-2"
                  />
                )}
              </h2>
              {!user?.isPremium && (
                <p className="text-[#AAAAAA]">
                  Bạn đang là thành viên miễn phí.
                </p>
              )}
              {user?.isPremium && (
                <p className="text-[#AAAAAA]">
                  Tài khoản của bạn đã được nâng cấp Premium.
                </p>
              )}
            </div>
          </div>
          {!user?.isPremium && (
            <>
              <h1 className="w-fit mx-auto text-white font-[Tektur] font-extrabold text-[25px] mt-15">
                Nâng cấp tài khoản Premium ngay bây giờ
              </h1>
              <div class="w-80 h-100 bg-gradient-to-tr from-[#212B5F] to-[#6B7FFA] rounded-2xl mx-auto mt-10 hover:scale-105 transition-smooth duration-300 mb-5">
                {/* Title */}
                <div className="w-[90%] mx-auto">
                  <h1 className="pt-3 text-white font-bold text-2xl">
                    Vĩnh viễn{" "}
                    <FontAwesomeIcon
                      icon={faCrown}
                      className="text-[#FFD875] ml-2"
                    />
                  </h1>
                  {/* Price */}
                  <div className="relative flex mt-2 items-center gap-3">
                    <p className="text-[#FFD875] font-bold text-xl blur-[2px] relative">
                      234K
                    </p>
                    <div className="absolute bg-[#FFD875] w-[2px] h-[50px] rotate-58 blur-[2px] left-[23px]"></div>
                    <p className="text-[#FFD875] font-bold text-xl relative">
                      200K
                    </p>
                    <div>
                      <p className="text-[10px] px-[2px] bg-white rounded-[5px] text-black font-semibold">
                        Giảm 15%
                      </p>
                    </div>
                  </div>
                  {/* Infor */}
                  <div className="mt-7 text-white  space-y-3 w-full ml-2">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faCheck} />
                      <p>Tắt quảng cáo</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faCheck} />
                      <p>Xem phim chất lượng cao</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faCheck} />
                      <p>Thay đổi được Avatar</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faCheck} />
                      <p>Tên được gắn nhãn Premium</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faCheck} />
                      <p>Ưu tiên được xử lý khi gặp lỗi</p>
                    </div>
                  </div>
                  <button
                    className="w-[90%] mx-auto h-[40px] bg-white flex items-center justify-center mt-10 rounded-xl gap-2 hover:opacity-90 font-semibold cursor-pointer"
                    onClick={() => setOpenModal(true)}
                  >
                    Chọn
                    <div className="flex flex-col mt-[2px]">
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="text-black text-[10px]"
                      />
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="text-black text-[10px]"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <Modal open={openModal} onClose={() => setOpenModal(false)} center>
          <div className="w-100 h-130 bg-[#2A314E] flex flex-col items-center">
            <h1 className="text-white font-bold text-2xl pt-4">Xác nhận</h1>
            <p className="flex gap-1 text-[#AAAAAA] mt-5">
              Bạn đang chọn gói{" "}
              <span className="text-[#FFD875] font-bold">
                Premium vĩnh viễn
              </span>{" "}
              (200k)
            </p>
            <p className="text-[#AAAAAA] mt-2">Vui lòng quét mã thanh toán</p>
            <img src="/sticker(2).webp" className="w-[60%] rounded-xl mt-5" />
            <button
              className="w-[80%] h-[40px] bg-[#FFD875] mt-4 rounded-md font-semibold cursor-pointer"
              onClick={handlePremium}
            >
              Xác nhận
            </button>
            <button
              className="w-[80%] h-[40px] bg-white mt-4 rounded-md font-semibold cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              Thoát
            </button>
          </div>
        </Modal>
        <Footer/>
      </AnimatedPage>
    </>
  );
};

export default Premium;
