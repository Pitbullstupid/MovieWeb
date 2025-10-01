import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { genreMap } from "@/lib/data";
import { Link } from "react-router";

const Header = () => {
  const [scrollHotMovie, setScrollHotMovie] = useState(false);
  useEffect(() => {
    if (scrollHotMovie) {
      window.scrollTo({
        top: 1600,
        behavior: "smooth",
      });
      setScrollHotMovie(false);
    }
  }, [scrollHotMovie]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-black to-gray-900 border-b border-gray-800">
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
            />
          </div>

          {/* Menu */}
          <nav className="flex items-center font-medium gap-10 ml-9">
            <a
              href="#"
              className="hover:text-yellow-400 text-white"
              onClick={(e) => {
                e.preventDefault();
                setScrollHotMovie(true);
              }}
            >
              Phim hot
            </a>

            {/* Thể loại */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-yellow-400 focus:outline-none text-white">
                Thể loại<span className="text-[10px]"> ▼</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0b0b0b] opacity-90 text-sm min-w-[300px] p-2 grid grid-cols-2 gap-1 rounded-md shadow-lg mt-4 border-none">
                {Object.entries(genreMap).map(([id, name]) => (
                  <DropdownMenuItem asChild key={id}>
                    <Link
                      to={`/the-loai/${id}`}
                      className="block px-3 py-2 rounded text-white transition-colors
               hover:bg-gray-500/70 hover:text-yellow-400/70
               data-[highlighted]:bg-gray-500/70 data-[highlighted]:text-yellow-400/70"
                    >
                      {name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#" className="hover:text-yellow-400 text-white">
              Phim lẻ
            </a>
            <a href="#" className="hover:text-yellow-400 text-white">
              Phim bộ
            </a>

            {/* Quốc gia */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-yellow-400 focus:outline-none text-white">
                Quốc gia<span className="text-[10px]"> ▼</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0b0b0b] opacity-90 text-sm p-1 mt-4 border-none rounded-md shadow-lg">
                <DropdownMenuItem
                  className="w-full px-2 py-1 rounded text-white transition-colors
                           hover:bg-gray-500/70 hover:text-yellow-400/70
                           data-[highlighted]:bg-gray-500/70 data-[highlighted]:text-yellow-400/70"
                >
                  Mỹ
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="w-full px-2 py-1 rounded text-white transition-colors
                           hover:bg-gray-500/70 hover:text-yellow-400/70
                           data-[highlighted]:bg-gray-500/70 data-[highlighted]:text-yellow-400/70"
                >
                  Nhật Bản
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Lịch chiếu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-yellow-400 focus:outline-none text-white">
                Lịch chiếu<span className="text-[10px]"> ▼</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0b0b0b] opacity-90 text-sm min-w-[150px] p-1 mt-4 border-none rounded-md shadow-lg">
                <DropdownMenuItem
                  className="w-full px-2 py-1 rounded text-white transition-colors
                           hover:bg-gray-500/70 hover:text-yellow-400/70
                           data-[highlighted]:bg-gray-500/70 data-[highlighted]:text-yellow-400/70"
                >
                  Hôm nay
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="w-full px-2 py-1 rounded text-white transition-colors
                           hover:bg-gray-500/70 hover:text-yellow-400/70
                           data-[highlighted]:bg-gray-500/70 data-[highlighted]:text-yellow-400/70"
                >
                  Tuần này
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          {/* Login */}
          <div className="ml-[150px]">
            <Button
              variant="outline"
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg font-medium"
            >
              Login
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
