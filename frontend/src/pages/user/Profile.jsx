import AnimatedPage from "@/components/AnimatedPage";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  faClockRotateLeft,
  faCrown,
  faGrip,
  faHeart,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import ModalAvatar from "@/components/ModalAvatar";
import ModalPassword from "@/components/ModalPassword"; // ⬅️ import modal riêng

const Profile = ({ setIsLogin }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

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

  // Modal state
  const [openModalAvt, setOpenModalAvt] = useState(false);
  const [openModalPass, setOpenModalPass] = useState(false);

  // Logout
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    navigate(`/`);
    toast.success("Đăng xuất thành công!");
  };

  // Tìm user theo id
  const user = userList?.find((u) => u._id === slug);

  // State lưu user info
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setUserAvatar(user.Avatar);
    }
  }, [user]);

  // Re-render Header
  const [renderKey, setRenderKey] = useState(0);

  // Cập nhật user(name, avatar)
  const handleUpdateUser = async () => {
    if (!user?._id) return toast.error("Không tìm thấy user");
    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName,
            Avatar: userAvatar,
          }),
        }
      );
      const updateUser = await response.json();
      toast.success("Cập nhật thông tin thành công");
      setUserList((prevUsers) =>
        prevUsers.map((u) => (u._id === updateUser._id ? updateUser : u))
      );
      setRenderKey((prev) => prev + 1);
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
    }
  };

  return (
    <>
      <Header key={renderKey} />
      <AnimatedPage>
        <div className="mt-25 w-full flex px-5">
          {/* Sidebar */}
          <div className="w-[20%] h-[420px] bg-[#25272F] rounded-2xl flex flex-col justify-center items-center">
            <div className="w-[80%] h-[90%]">
              <h1 className="text-white text-center font-semibold text-[20px] pb-5">
                Quản lý tài khoản
              </h1>
              <div>
                <Link>
                  <div className="group flex space-x-2 items-center border-b-2 border-[#2E313A] mb-5">
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
                  <div className="group flex space-x-2 items-center border-b-2 border-[#2E313A] mb-5">
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
                  <div className="group flex space-x-2 items-center border-b-2 border-[#2E313A] mb-5">
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
                <div className="mt-7">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={`${user?.Avatar || "https://github.com/shadcn.png"}`}
                    />
                    <AvatarFallback>Avt</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex space-x-2 mt-3 items-center">
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
                <div className="group flex space-x-2 items-center mt-3">
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

          {/* Input form */}
          <div className="w-[80%] pl-[40px]">
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
              <div>
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
              </div>
            </div>

            {/* Change password */}
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

            {/* Update button */}
            <button
              className="bg-[#FFD875] px-[20px] py-[10px] rounded-xl font-semibold mt-5 hover:opacity-90 text-sm"
              onClick={handleUpdateUser}
            >
              Cập nhật
            </button>
          </div>
        </div>

        {/* Modal Avatar */}
        <ModalAvatar
          open={openModalAvt}
          onClose={() => setOpenModalAvt(false)}
          onUpdate={handleUpdateUser}
          setUserAvatar={setUserAvatar}
        />

        {/* Modal Password */}
        <ModalPassword
          open={openModalPass}
          onClose={() => setOpenModalPass(false)}
          user={user}
          setUserList={setUserList}
        />
      </AnimatedPage>
    </>
  );
};

export default Profile;
