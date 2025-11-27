import AnimatedPage from "@/components/AnimatedPage";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  faClockRotateLeft,
  faCrown,
  faGrip,
  faHeart,
  faInfinity,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import ModalAvatar from "@/components/ModalAvatar";
import ModalPassword from "@/components/ModalPassword";
import Footer from "@/components/Footer";
import FavouriteMovies from "@/components/FavouriteMovies";
import Inforform from "@/components/Inforform";
import HistoryMovies from "@/components/HistoryMovies";

const Profile = ({ setIsLogin }) => {
  const { slug } = useParams();
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState(location.state?.view || "account");

  useEffect(() => {
    if (location.state?.view) {
      setView(location.state.view);
    }
  }, [location.state]);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/movies");
        const data = await res.json();
        setMoviesData(Array.isArray(data) ? data : []);
      } catch {
        setMoviesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
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
  const isExpired = user?.isPremium && new Date(user?.isPremium) < new Date();
  return (
    <>
      <Header key={renderKey} movies={moviesData} />
      <AnimatedPage>
        <div className="mt-25 w-full flex px-5 min-h-115">
          {/* Sidebar */}
          <div className="w-[20%] h-[480px] bg-[#25272F] rounded-2xl flex flex-col justify-center items-center mb-10">
            <div className="w-[80%] h-[90%]">
              <h1 className="text-white text-center font-semibold text-[20px] pb-5">
                Quản lý tài khoản
              </h1>
              <div>
                <Link>
                  <div
                    className="group flex space-x-2 items-center border-b-2 border-[#2E313A] mb-5"
                    onClick={() => setView("favouMovies")}
                  >
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
                  <div
                    className="group flex space-x-2 items-center border-b-2 border-[#2E313A] mb-5"
                    onClick={() => setView("historyMovies")}
                  >
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
                  <div
                    className="group flex space-x-2 items-center border-b-2 border-[#2E313A] mb-5"
                    onClick={() => setView("account")}
                  >
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
                <div className="mt-20">
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
                      {user?.isPremium && !isExpired && (
                        <FontAwesomeIcon
                          icon={faCrown}
                          className="text-[#FFD875]"
                        />
                      )}
                      {(!user?.isPremium || isExpired) && (
                        <FontAwesomeIcon
                          icon={faInfinity}
                          className="text-[#FFD875]"
                        />
                      )}
                    </div>
                    <p className="text-[#AAAAAA] text-[15px]">{user?.email}</p>
                  </div>
                </div>

                {/* Logout */}
                <div className="group flex space-x-2 items-center mt-3 ">
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-white pb-2 group-hover:text-[#FFD875] cursor-pointer"
                  />
                  <button
                    className="text-white pb-2 group-hover:text-[#FFD875] cursor-pointer"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Content*/}
          <div className="w-[80%] pl-[40px]">
            {view === "favouMovies" ? (
              <FavouriteMovies setView={setView} user={user} moviesData={moviesData} loading={loading}/>
            ) : view === "historyMovies" ? (
              <HistoryMovies setView={setView} moviesData={moviesData} loading={loading}/>
            ) : (
              <Inforform
                user={user}
                userName={userName}
                setUserName={setUserName}
                setOpenModalAvt={setOpenModalAvt}
                handleUpdateUser={handleUpdateUser}
                setOpenModalPass={setOpenModalPass}
              />
            )}
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
        <Footer />
      </AnimatedPage>
    </>
  );
};

export default Profile;
