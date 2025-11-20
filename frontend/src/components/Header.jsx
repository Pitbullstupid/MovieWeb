import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { genreMap, languageCountryMap, year } from "@/lib/data";
import { Link, useNavigate } from "react-router";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import LoginForm from "./LoginForm";
import UserMenu from "./UserMenu";

const Header = () => {
  const [scrollHotMovie, setScrollHotMovie] = useState(false);
  //Login
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(id);
  }, [isLogin, openModal]);

  // xử lý tìm kiếm
  const [keyword, setKeyWord] = useState("");
  const navigate = useNavigate();
  const handleKey = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      navigate(`/tim-kiem/${encodeURIComponent(keyword.trim())}`);
    }
  };

  // scroll hotmovie
  useEffect(() => {
    if (scrollHotMovie) {
      navigate(`/`);
      setTimeout(() => {
        window.scrollTo({
          top: 1600,
          behavior: "smooth",
        });
      }, 400);
      setScrollHotMovie(false);
    }
  }, [scrollHotMovie]);
// menu sticky
  useEffect(() => {
    let lastY = 0;

    const onScroll = () => {
      if (window.scrollY > lastY) {
        setHidden(true); // cuộn xuống -> ẩn header
      } else {
        setHidden(false); // cuộn lên -> hiện header
      }
      lastY = window.scrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 
  bg-gradient-to-r from-black to-gray-900 border-b border-gray-800
  transition-transform duration-300 
  ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="max-w-screen-xl mx-auto flex items-center py-3 px-6">
          {/* Logo + Search */}
          <div className="flex items-center space-x-6">
            <Link to={`/`}>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#db5840] to-[#b6b2b2]">
                MovieWeb
              </h1>
            </Link>
            <Input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="bg-[#1c1c1c] text-white border-0 focus:ring-0"
              value={keyword}
              onChange={(e) => setKeyWord(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>

          {/* Menu */}
          <nav className="flex items-center font-medium gap-6 ml-9">
            <Link to={`/`}>
              <p
                href="/"
                className="hover:text-default text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setScrollHotMovie(true);
                }}
              >
                Phim hot
              </p>
            </Link>

            {/* Thể loại */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-default focus:outline-none text-white cursor-pointer">
                Thể loại<span className="text-[10px]"> ▼</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0b0b0b] opacity-90 text-sm min-w-[300px] p-2 grid grid-cols-2 gap-1 rounded-md shadow-lg mt-4 border-none">
                {Object.entries(genreMap).map(([id, name]) => (
                  <DropdownMenuItem asChild key={id}>
                    <Link
                      to={`/the-loai/${id}`}
                      className="block px-3 py-2 rounded text-white transition-colors
               hover:bg-gray-500/70 hover:text-default/70
               data-[highlighted]:bg-gray-500/70 data-[highlighted]:text-default/70 cursor-pointer"
                    >
                      {name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to={`/phim-chieu-rap`}>
              <p href="#" className="hover:text-default text-white">
                Phim chiếu rạp
              </p>
            </Link>

            <Link to={`/anime`}>
              <a href="#" className="hover:text-default text-white">
                Anime
              </a>
            </Link>

            {/* Quốc gia */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-default focus:outline-none text-white cursor-pointer">
                Quốc gia<span className="text-[10px]"> ▼</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0b0b0b] opacity-90 text-sm min-w-[150px] h-[300px] p-1 mt-4 border-none rounded-md shadow-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
                {Object.entries(languageCountryMap).map(([id, name]) => (
                  <DropdownMenuItem asChild key={id}>
                    <Link
                      to={`/quoc-gia/${id}`}
                      className="block px-3 py-2 rounded text-white transition-colors
               hover:bg-gray-500/70 hover:text-default/70
               data-[highlighted]:bg-gray-500/70 data-[highlighted]:text-default/70 cursor-pointer"
                    >
                      {name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Lịch chiếu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-default focus:outline-none text-white cursor-pointer">
                Năm phát hành<span className="text-[10px]"> ▼</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0b0b0b] opacity-90 text-sm min-w-[120px] h-[300px] p-1 mt-4 border-none rounded-md shadow-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
                {Object.entries(year)
                  .sort((a, b) => b[0] - a[0])
                  .map(([id, name]) => (
                    <DropdownMenuItem asChild key={id}>
                      <Link
                        to={`/nam-phat-hanh/${id}`}
                        className="block px-3 py-2 rounded text-white transition-colors
               hover:bg-gray-500/70 hover:text-default/70
               data-[highlighted]:bg-gray-500/70 data-[highlighted]:text-default/70 cursor-pointer"
                      >
                        Năm {name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          {/* Login */}
          {isLogin === false ? (
            <div className="ml-[150px]">
              <Button
                variant="outline"
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg font-medium cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                Login
              </Button>
            </div>
          ) : (
            <div className="ml-[190px] ">
              <UserMenu setIsLogin={setIsLogin} userId={userId} />
            </div>
          )}
          <Modal open={openModal} onClose={() => setOpenModal(false)} center>
            <div className="w-full flex items-center justify-between ">
              <img
                src="/sticker(2).webp"
                alt=""
                className="w-[435px] h-[435px]"
              />
              <LoginForm
                setOpenModal={setOpenModal}
                setIsLogin={setIsLogin}
                setUserId={setUserId}
              />
            </div>
          </Modal>
        </div>
      </header>
    </>
  );
};

export default Header;
