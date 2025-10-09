import AnimatedPage from "@/components/AnimatedPage";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { users } from "@/lib/data";
import {
  faClockRotateLeft,
  faCrown,
  faGrip,
  faHeart,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const Profile = ({ setIsLogin }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openModalAvt, setOpenModalAvt] = useState(false);
  const [openModalPass, setOpenModalPass] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    navigate(`/`);
    toast.success("Đăng xuất thành công!");
  };
  const user = users.find((u) => u.userId === Number(slug));
  return (
    <>
      <Header />
      <AnimatedPage>
        <div className="mt-25 w-full flex px-5">
          <div className="w-[20%] h-[420px] bg-[#25272F] rounded-2xl flex flex-col justify-center items-center">
            <div className="w-[80%] h-[90%]">
              <h1 className="text-white text-center font-semibold text-[20px] pb-5">
                Quản lý tài khoản
              </h1>
              {/* Menu */}
              <div>
                <Link>
                  <div className=" group flex space-x-2 items-center border-b-2 border-[#2E313A] mb-5">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-white pb-2 group-hover:text-[#FFD875]"
                    />
                    <p className="text-white pb-2 group-hover:text-[#FFD875]">
                      Yêu thích
                    </p>
                  </div>
                </Link>
                <Link>
                  <div className=" group flex space-x-2 items-center border-b-2 border-[#2E313A] mb-5">
                    <FontAwesomeIcon
                      icon={faClockRotateLeft}
                      className="text-white pb-2 group-hover:text-[#FFD875]"
                    />
                    <p className="text-white pb-2 group-hover:text-[#FFD875]">
                      Xem tiếp
                    </p>
                  </div>
                </Link>
                <Link>
                  <div className=" group flex space-x-2 items-center border-b-2 border-[#2E313A] mb-5">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-white pb-2 group-hover:text-[#FFD875]"
                    />
                    <p className="text-white pb-2 group-hover:text-[#FFD875]">
                      Tài khoản
                    </p>
                  </div>
                </Link>
                {/* Infor */}
                <div className=" mt-7">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={`${user?.Avatar || "https://github.com/shadcn.png"}`} />
                    <AvatarFallback>Avt</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex space-x-2  mt-3 items-center">
                      <p className="text-[#AAAAAA] text-[15px]">
                        {user?.userName}
                      </p>
                      {user?.isPremium && (
                        <FontAwesomeIcon
                          icon={faCrown}
                          className="text-[#FFD875]"
                        />
                      )}
                    </div>
                    <p className="text-[#AAAAAA] text-[15px]">{user?.email}</p>
                  </div>
                </div>
                {/* Logout */}
                <div className=" group flex space-x-2 items-center mt-3">
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-white pb-2 group-hover:text-[#FFD875]"
                  />
                  <button
                    className="text-white pb-2 group-hover:text-[#FFD875]"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Input */}
          <div className="w-[80%] pl-[40px]">
            <h1 className="text-white font-semibold text-[20px]">Tài khoản</h1>
            <p className="text-[#AAAAAA]">Cập nhật thông tin tài khoản</p>
            <div className="flex items-center gap-15">
              <div className="mt-4">
                {/* Email */}
                <div>
                  <p className="text-[#AAAAAA]">Email</p>
                  <Input
                    disabled
                    placeholder={`${user?.email}`}
                    className="w-[350px] placeholder:text-white mt-3"
                  ></Input>
                </div>
                {/* UserName */}
                <div className="mt-6">
                  <p className="text-[#AAAAAA]">Tên hiển thị</p>
                  <Input
                    placeholder={`${user?.userName}`}
                    className="w-[350px] placeholder:text-white mt-3 text-white"
                  ></Input>
                </div>
              </div>
              {/* Avatar */}
              <div>
                <Avatar className="w-28 h-28 mt-10">
                  <AvatarImage src={`${user?.Avatar || "https://github.com/shadcn.png"}`} />
                  <AvatarFallback>Avt</AvatarFallback>
                </Avatar>
                {user?.isPremium && (
                  <button
                    className=" group flex text-white items-center gap-2 cursor-pointer mt-3"
                    onClick={() => setOpenModalAvt(true)}
                  >
                    <FontAwesomeIcon
                      icon={faGrip}
                      className="group-hover:text-[#FFD875]"
                    />
                    <p className="group-hover:text-[#FFD875]">Chọn avatar</p>
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm text-[#AAAAAA] pt-4">
                Đổi mật khẩu, nhấn vào
              </p>
              <button
                className="pt-4 text-[#FFD875] hover:underline"
                onClick={() => setOpenModalPass(true)}
              >
                đây
              </button>
            </div>
            <button className="bg-[#FFD875] px-[15px] py-[5px] rounded-xl font-semibold mt-5 hover:opacity-90">
              Cập nhật
            </button>
          </div>
        </div>
        <Modal
          open={openModalAvt}
          onClose={() => setOpenModalAvt(false)}
          center
        >
          <div className="w-150 flex  bg-[#2A314E] h-100">
            <div className="mt-5 ml-5">
              <h1 className="text-white font-semibold">Đổi ảnh đại diện</h1>
            </div>
          </div>
        </Modal>
        <Modal
          open={openModalPass}
          onClose={() => setOpenModalPass(false)}
          center
        >
          <div className="w-100 flex  bg-[#2A314E] h-105">
            <div className="mt-5 ml-5">
              <div className="mt-6">
                <p className="text-[#AAAAAA]">Mật khẩu cũ</p>
                <Input className="w-[350px] mt-3 text-white"></Input>
              </div>
              <div className="mt-6">
                <p className="text-[#AAAAAA]">Mật khẩu mới</p>
                <Input className="w-[350px] mt-3 text-white"></Input>
              </div>
              <div className="mt-6">
                <p className="text-[#AAAAAA]">Xác nhận mật khẩu mới</p>
                <Input className="w-[350px] mt-3 text-white"></Input>
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <button className="bg-[#FFD875] px-[15px] py-[5px] rounded-xl font-semibold mt-5 hover:opacity-90">
                  Cập nhật
                </button>
                <button className="bg-white px-[15px] py-[5px] rounded-xl font-semibold mt-5 hover:opacity-90" onClick={() => setOpenModalPass(false)}>
                  Thoát
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </AnimatedPage>
    </>
  );
};

export default Profile;
