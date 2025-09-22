import React, { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { genreMap } from "../lib/data";
import { gradients } from "../lib/data";
import { Link } from "react-router-dom";
const Category = () => {
  const [showMore, setShowMore] = useState(false);
  // lấy thể loại
  const genres = Object.entries(genreMap);

  return (
    <div className="pt-3 bg-gradient-to-r from-black to-gray-900 pl-4">
      <h1 className="font-medium text-2xl text-white ml-3">
        Bạn đang quan tâm gì?
      </h1>
      <div className="flex flex-wrap justify-start items-start gap-5 ml-3">
        {/* render 5 ô đầu */}
        {genres.slice(0, 5).map(([id, name], index) => (
          <div
            key={id}
            className="w-[15%] h-35 rounded-lg flex flex-col justify-center hover:-translate-y-2.5 transition-transform duration-200 cursor-pointer  mt-3 space-y-2"
            style={{
              background: `linear-gradient(to right, ${gradients[index][0]}, ${gradients[index][1]})`,
            }}
          >
            <Link to={`/the-loai/${id}`}>
              <p className="font-bold text-2xl  text-white ml-2">{name}</p>
              <p className=" text-white flex ml-2">
                Xem chủ đề <ChevronRight size={25} strokeWidth={2.5} />
              </p>
            </Link>
          </div>
        ))}

        {/*thêm chủ đề */}
        <div
          onClick={() => setShowMore(!showMore)}
          className="w-[15%] h-35 rounded-lg flex flex-col justify-center hover:-translate-y-2.5 transition-transform duration-200 cursor-pointer  mt-3 space-y-2"
          style={{
            background: `linear-gradient(to right, ${gradients[5][0]}, ${gradients[5][1]})`,
          }}
        >
          <p className="font-bold text-2xl  text-white flex ml-2">
            <Plus size={25} strokeWidth={2.5} className="mt-[5px] ml-2" /> Chủ
            Đề Khác
          </p>
        </div>

        {/* render thêm các chủ đề khác*/}
        {showMore &&
          genres.slice(5).map(([id, name], index) => (
            <div
              key={id}
              className="w-[15%] h-35 rounded-lg flex flex-col justify-center hover:-translate-y-2.5 transition-transform duration-200 cursor-pointer  mt-3 space-y-2"
              style={{
                background: `linear-gradient(to right, ${
                  gradients[(index + 6) % gradients.length][0]
                }, ${gradients[(index + 6) % gradients.length][1]})`,
              }}
            >
              <Link to={`/the-loai/${id}`}>
                <p className="font-bold text-2xl  text-white ml-2">{name}</p>
                <p className=" text-white flex ml-2">
                  Xem chủ đề <ChevronRight size={25} strokeWidth={2.5} />
                </p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
