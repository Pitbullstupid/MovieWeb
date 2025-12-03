import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import UserMenu from "./UserMenu";

const HeaderAdmin = ({ user, setIsLogin, transition }) => {
  return (
    <div className="fixed top-0 right-0 w-full z-50">
      <div className="h-[63px] bg-bgdefault flex justify-between items-center relative ml-16 px-4">
        <div>
          <p className={`text-[18px] text-white transition-transform duration-300 ${transition ? "translate-x-48" : "translate-x-0"}`}>Xin chào Admin, {user?.userName}</p>
        </div>
        <div className="flex items-center space-x-8">
          <div className="relative">
            <FontAwesomeIcon icon={faBell} className="text-white text-2xl" />
            {/* badge thông báo */}
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              8
            </div>
          </div>
          <UserMenu setIsLogin={setIsLogin} userId={user?._id} />
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
