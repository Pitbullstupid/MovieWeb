import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFilm,
  faList,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router";

export default function SideBar({ setView, setTransition }) {
  const [expanded, setExpanded] = useState(false);
  setTransition(expanded);

  return (
    <div
      className={`
        fixed top-0 left-0 h-full bg-bgdefault text-white z-50 border-r border-gray-600
        transition-all duration-300 ease-in-out
        ${expanded ? "w-64" : "w-16"}
      `}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded(prev => !prev)}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {expanded && (
            <img
              src="https://www.svgrepo.com/show/484603/movie-film.svg"
              alt="Logo"
              className="w-[30px]"
            />
          )}
          {expanded && (
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#db5840] to-[#b6b2b2]">
              MovieWeb
            </h1>
          )}
        </Link>
        {!expanded && (
          <img
            src="https://www.svgrepo.com/show/484603/movie-film.svg"
            alt="Logo"
            className="w-[30px]"
          />
        )}
      </div>

      {/* Menu */}
      <ul className="mt-5 space-y-5 p-2 ml-2">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-3 "onClick={() => setView("home")}>
            <FontAwesomeIcon icon={faHome} className="w-6" />
            <span
              className={`transition-opacity duration-200 ${expanded ? "opacity-100" : "opacity-0"
                } w-32 overflow-hidden whitespace-nowrap`}
            >
              Trang chủ
            </span>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-3" onClick={() => setView("movies")}>
            <FontAwesomeIcon icon={faFilm} className="w-6" />
            <span 
              className={`transition-opacity duration-200 ${expanded ? "opacity-100" : "opacity-0"
                } w-32 overflow-hidden whitespace-nowrap`}
            >
              Quản lý phim
            </span>
          </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-3" onClick={() => setView("category")}>
          <FontAwesomeIcon icon={faList} className="w-6" />
          <span
            className={`transition-opacity duration-200 ${expanded ? "opacity-100" : "opacity-0"
              } w-32 overflow-hidden whitespace-nowrap`}
          >
            Thể loại
          </span>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-3"onClick={() => setView("account")}>
          <FontAwesomeIcon icon={faUser} className="w-6" />
          <span
            className={`transition-opacity duration-200 ${expanded ? "opacity-100" : "opacity-0"
              } w-32 overflow-hidden whitespace-nowrap`}
          >
            Tài khoản
          </span>
        </li>
      </ul>
    </div>
  );
}
