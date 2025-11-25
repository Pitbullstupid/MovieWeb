import AnimatedPage from "@/components/AnimatedPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PremiumCard from "@/components/PremiumCard";
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
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [price, setPrice] = useState(null);
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
  // const handlePremium = async () => {
  //   try {
  //     const expiredDate = new Date();
  //     expiredDate.setDate(expiredDate.getDate() + selectedPackage * 30);
  //     const response = await fetch(
  //       `http://localhost:5001/api/users/${user._id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           isPremium: expiredDate,
  //         }),
  //       }
  //     );
  //     const updatePremium = await response.json();
  //     toast.success("Nâng cấp tài khoản thành công");
  //     setUserList((prevUsers) =>
  //       prevUsers.map((u) => (u._id === updatePremium._id ? updatePremium : u))
  //     );
  //     setHeaderKey((prev) => prev + 1);
  //     setOpenModal(false);
  //   } catch (error) {
  //     console.error("Lỗi khi nâng cấp tài khoản:", error);
  //   }
  // };
  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          months: selectedPackage,
          price: price,
        }),
      });

      const data = await response.json();

      if (data.success && data.session_url) {
        window.location.href = data.session_url;
      } else {
        toast.error("Có lỗi xảy ra khi chọn gói nâng cấp.");
        console.error(data);
      }
    } catch (error) {
      console.error("Lỗi API placeOrder:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  // Tìm user theo id
  const user = userList?.find((u) => u._id === slug);
  const isExpired = user?.isPremium && new Date(user?.isPremium) < new Date();
  // lấy thời gian
  const currentDate = new Date();
  let endDate;
  let title;

  if (user?.isPremium && new Date(user.isPremium) > currentDate) {
    const dayExpired = new Date(user.isPremium);
    endDate = new Date(dayExpired);
    endDate.setDate(dayExpired.getDate() + selectedPackage * 30);
    title = "Gia hạn Premium thêm";
  } else {
    endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + selectedPackage * 30);
    title = "Bạn đang chọn gói";
  }

  return (
    <>
      <Header key={headerKey} />
      <AnimatedPage>
        <div className="w-full mt-25 min-h-115 mb-10">
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
                {user?.isPremium  && !isExpired && (
                  <FontAwesomeIcon
                    icon={faCrown}
                    className="text-[#FFD875] ml-2"
                  />
                )}
                {(!user?.isPremium || isExpired) && (
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
              {user?.isPremium && !isExpired && (
                <p className="text-[#AAAAAA]">
                  Tài khoản Premium. Hết hạn:{" "}
                  {new Date(user.isPremium).toLocaleDateString("vi-VN")}
                </p>
              )}
              {user?.isPremium && isExpired && (
                <p className="text-[#AAAAAA]">Tài khoản Premium đã hết hạn.</p>
              )}
            </div>
          </div>
          {!user?.isPremium && (
            <h1 className="w-fit mx-auto text-white font-[Tektur] font-extrabold text-[25px] mt-15">
              Nâng cấp tài khoản Premium ngay bây giờ
            </h1>
          )}
          {user?.isPremium && (
            <h1 className="w-fit mx-auto text-white font-[Tektur] font-extrabold text-[25px] mt-15">
              Gia hạn tài khoản Premium
            </h1>
          )}
          <div className="flex w-[85%] mx-auto">
            <PremiumCard
              label="Gói 1 tháng"
              duration={1}
              price={50000}
              oldPrice={70000}
              onSelect={(months, price) => {
                setSelectedPackage(months);
                setOpenModal(true);
                setPrice(price);
              }}
            />

            <PremiumCard
              label="Gói 3 tháng"
              duration={3}
              price={120000}
              oldPrice={180000}
              onSelect={(months, price) => {
                setSelectedPackage(months);
                setOpenModal(true);
                setPrice(price);
              }}
            />

            <PremiumCard
              label="Gói 6 tháng"
              duration={6}
              price={200000}
              oldPrice={300000}
              onSelect={(months, price) => {
                setSelectedPackage(months);
                setOpenModal(true);
                setPrice(price);
              }}
            />
          </div>
        </div>
        <Modal open={openModal} onClose={() => setOpenModal(false)} center>
          <div className="w-100 h-70 bg-[#2A314E] flex flex-col items-center">
            <h1 className="text-white font-bold text-2xl pt-4">Xác nhận</h1>
            <p className="flex gap-1 text-[18px] text-white mt-5">
              {title}
              <span className="text-[#FFD875] font-bold">
                {selectedPackage} tháng
              </span>{" "}
              ({price?.toLocaleString("vi-VN")}đ)
            </p>
            <div className="flex gap-1 text-[15px] mb-3">
              <p className="text-[#AAAAAA] mt-2">
                Bắt đầu {currentDate.toLocaleDateString("vi-VN")}
              </p>
              <span className="text-[#AAAAAA] mt-2">-</span>
              <p className="text-[#AAAAAA] mt-2">
                Hết hạn {endDate.toLocaleDateString("vi-VN")}
              </p>
            </div>
            <button
              className="w-[80%] h-[40px] bg-[#FFD875] mt-4 rounded-md font-semibold cursor-pointer flex items-center justify-center gap-1"
              onClick={placeOrder}
            >
              <FontAwesomeIcon icon={faCheck} />
              <p>Xác nhận</p>
            </button>
            <button
              className="w-[80%] h-[40px] border border-white-1 text-white mt-4 rounded-md font-semibold cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              Đóng
            </button>
          </div>
        </Modal>
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default Premium;
