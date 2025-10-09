import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/button";
import { users } from "@/lib/data";
import { Link, useNavigate } from "react-router-dom";
const UserMenu = ({ setIsLogin, userId }) => {
  const user = users.find((u) => u.userId === Number(userId));
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    toast.success("Đăng xuất thành công");
    setIsLogin(false);
    navigate(`/`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={`${user?.Avatar || "https://github.com/shadcn.png"}`} />
          <AvatarFallback>Avt</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#2B3047] opacity-90 text-sm w-[240px] h-[300px] p-1 mt-2 border-none rounded-md shadow-lg mr-3 text-white font-semibold space-y-1 ">
        <DropdownMenuLabel className="text-yellow-400 font-bold">
          Xin chào, {user?.userName || "Người dùng"}
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <p className="text-sm">
            Nâng cấp tài khoản để được hưởng thêm nhiều ưu đãi hơn
          </p>
        </DropdownMenuLabel>
        <DropdownMenuItem className="w-full bg-transparent hover:bg-transparent focus:bg-transparent">
          <Button className="mx-auto bg-[#FFD875] hover:opacity-85 hover:bg-[#FFD875]">
            <p className="text-black">Nâng cấp ngay</p>
            <div className="flex flex-col space-y-0">
              <FontAwesomeIcon
                icon={faChevronUp}
                className="text-black text-[7px] "
              />
              <FontAwesomeIcon
                icon={faChevronUp}
                className="text-black text-[7px] "
              />
            </div>
          </Button>
        </DropdownMenuItem>
        <Link to={`/user/profile/${user?.userId}`} state={{ fromMenu: true }}>
          <DropdownMenuItem className="hover:bg-[#5665a8] cursor-pointer ">
            <FontAwesomeIcon
              icon={faUser}
              className="text-white text-[15px] mr-2"
            />
            Tài khoản
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="hover:bg-[#5665a8] cursor-pointer">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-white text-[15px] mr-2"
          />
          Danh sách yêu thích
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-[#5665a8] cursor-pointer">
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            className="text-white text-[15px] mr-2"
          />
          Lịch sử xem
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleLogout}
          className="hover:bg-[#5665a8] cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-white text-[15px] mr-2"
          />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
