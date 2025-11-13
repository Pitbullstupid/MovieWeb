import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { faGrip } from "@fortawesome/free-solid-svg-icons";

const Inforform = ({
  user,
  setUserName,
  setOpenModalAvt,
  handleUpdateUser,
  setOpenModalPass
}) => {
  return (
    <>
      {/* Input form */}

      <h1 className="text-white font-semibold text-[20px]">Tài khoản</h1>
      <p className="text-[#AAAAAA]">Cập nhật thông tin tài khoản</p>
      <div className="flex items-center gap-15">
        <div className="mt-4">
          <div>
            <p className="text-[#AAAAAA]">Email</p>
            <Input
              disabled
              placeholder={`${user?.email}`}
              className="w-[350px] placeholder:text-white mt-3"
            ></Input>
          </div>
          <div className="mt-6">
            <p className="text-[#AAAAAA]">Tên hiển thị</p>
            <Input
              placeholder={`${user?.userName}`}
              onChange={(e) => setUserName(e.target.value)}
              className="w-[350px] placeholder:text-white mt-3 text-white"
            ></Input>
          </div>
        </div>

        {/* Avatar */}
        <div className=" flex flex-col items-center">
          <Avatar className="w-28 h-28 mt-10">
            <AvatarImage
              src={`${user?.Avatar || "https://github.com/shadcn.png"}`}
            />
            <AvatarFallback>Avt</AvatarFallback>
          </Avatar>
          {user?.isPremium && (
            <button
              className="group flex text-white items-center gap-2 cursor-pointer mt-3"
              onClick={() => setOpenModalAvt(true)}
            >
              <FontAwesomeIcon
                icon={faGrip}
                className="group-hover:text-[#FFD875]"
              />
              <p className="group-hover:text-[#FFD875]">Chọn avatar</p>
            </button>
          )}
          {!user?.isPremium && (
            <div>
              <p className="text-[#AAAAAA] mt-3 text-sm ">
                Nâng cấp tài khoản, tại{" "}
                <Link to={`/user/premium/${user?._id}`}>
                  <button className="text-[#FFD875] hover:underline cursor-pointer">
                    đây
                  </button>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Change password */}
      <div className="flex items-center gap-1">
        <p className="text-sm text-[#AAAAAA] pt-4">Đổi mật khẩu, nhấn vào</p>
        <button
          className="pt-4 text-[#FFD875] hover:underline cursor-pointer"
          onClick={() => setOpenModalPass(true)}
        >
          đây
        </button>
      </div>

      {/* Update button */}
      <button
        className="bg-[#FFD875] px-[20px] py-[10px] rounded-xl font-semibold mt-5 hover:opacity-90 text-sm cursor-pointer"
        onClick={handleUpdateUser}
      >
        Cập nhật
      </button>
    </>
  );
};

export default Inforform;
