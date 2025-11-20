import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faClockRotateLeft,
  faRightFromBracket,
  faChevronUp,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const UserMenu = ({ setIsLogin, userId }) => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

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

  const user = userList?.find((u) => u._id === userId);
  const handleLogout = (e) => {
    e.preventDefault();
    toast.success("Đăng xuất thành công");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setIsLogin(false);
    navigate(`/`);
    navigate(0);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage className="cursor-pointer"
              src={user?.Avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>Avt</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#2B3047] opacity-90 text-sm w-[240px] min-h-[220px] p-1 mt-2 border-none rounded-md shadow-lg mr-3 text-white font-semibold space-y-1 ">
          <DropdownMenuLabel className="text-yellow-400 font-bold">
            Xin chào, {user?.userName || "Người dùng"}
          </DropdownMenuLabel>
          {user?.isPremium && (
            <>
              <DropdownMenuLabel>
                <p className="text-sm text-center">
                  Bạn đã nâng cấp tài khoản lên Premium
                  <FontAwesomeIcon
                    icon={faCrown}
                    className="text-[#FFD875] ml-2"
                  />
                </p>
              </DropdownMenuLabel>
            </>
          )}
          {!user?.isPremium && (
            <>
              <DropdownMenuLabel>
                <p className="text-sm text-center">
                  Nâng cấp tài khoản để được hưởng thêm nhiều ưu đãi hơn
                </p>
              </DropdownMenuLabel>
              <DropdownMenuItem className="w-full flex justify-center bg-transparent hover:bg-transparent focus:bg-transparent">
                <Link to={`/user/premium/${user?._id}`}>
                  <Button className=" bg-[#FFD875] hover:opacity-85 hover:bg-[#FFD875] cursor-pointer">
                    <p className="text-black">Nâng cấp ngay</p>
                    <div className="flex flex-col space-y-0">
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="text-black text-[7px]"
                      />
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="text-black text-[7px]"
                      />
                    </div>
                  </Button>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          <Link to={`/user/profile/${user?._id}`} state={{ view: "account" }}>
            <DropdownMenuItem className="hover:bg-[#5665a8] cursor-pointer ">
              <FontAwesomeIcon
                icon={faUser}
                className="text-white text-[15px] mr-2"
              />
              Tài khoản
            </DropdownMenuItem>
          </Link>
          <Link
            to={`/user/profile/${user?._id}`}
            state={{ view: "favouMovies" }}
          >
            <DropdownMenuItem className="hover:bg-[#5665a8] cursor-pointer">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-white text-[15px] mr-2"
              />
              Danh sách yêu thích
            </DropdownMenuItem>
          </Link>
          <Link
            to={`/user/profile/${user?._id}`}
            state={{ view: "historyMovies" }}
          >
            <DropdownMenuItem className="hover:bg-[#5665a8] cursor-pointer">
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className="text-white text-[15px] mr-2"
              />
              Lịch sử xem
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={handleLogout}
            className="hover:bg-[#5665a8] cursor-pointer pb-3"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-white text-[15px] mr-2"
            />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
