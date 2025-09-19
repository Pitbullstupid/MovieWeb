import React, { useState } from "react";
import { ChevronRight, Plus } from 'lucide-react';
import { genreMap } from "../lib/data";
const Category = () => {

  const [showMore, setShowMore] = useState(false);

  // các màu gradient
const gradients = [
  ["#556DD9", "#7A8EE3"],
  ["#8080AB", "#A1A1C5"],
  ["#429A85", "#6FBFAF"],
  ["#8E7CC1", "#B09ED4"],
  ["#D59A83", "#E6B8A8"],
  ["#505363", "#7A7D91"],
  ["#459CA0", "#76C4C7"],
  ["#D5947A", "#E6B09B"],
  ["#6DBA67", "#9EDC97"],
  ["#B75C5C", "#D78B8B"],
  ["#B74C8A", "#D279A8"],
  ["#F087B0", "#F6AFCB"],
  ["#C65E93", "#DD8AB3"],
];

  // lấy thể loại
  const genres = Object.values(genreMap);

  return (
    <div className="pt-3 bg-gradient-to-r from-black to-gray-900 pl-4">
      <h1 className="font-medium text-2xl text-white ml-3">Bạn đang quan tâm gì?</h1>
      <div className="flex flex-wrap justify-start items-start gap-5 ml-3">
        {/* render 5 ô đầu */}
        {genres.slice(0, 5).map((genre, index) => (
          <div
            key={genre}
            className="w-[15%] h-35 rounded-lg flex flex-col justify-center hover:-translate-y-2.5 transition-transform duration-200 cursor-pointer  mt-3 space-y-2"
            style={{
              background: `linear-gradient(to right, ${gradients[index][0]}, ${gradients[index][1]})`
            }}
          >
            <p className="font-bold text-2xl  text-white ml-2">{genre}</p>
            <p className=" text-white flex ml-2">
              Xem chủ đề <ChevronRight size={25} strokeWidth={2.5} />
            </p>
          </div>
        ))}

        {/*thêm chủ đề */}
        <div
          onClick={() => setShowMore(!showMore)}
          className="w-[15%] h-35 rounded-lg flex flex-col justify-center hover:-translate-y-2.5 transition-transform duration-200 cursor-pointer  mt-3 space-y-2"
          style={{
            background: `linear-gradient(to right, ${gradients[5][0]}, ${gradients[5][1]})`
          }}
        >
          <p className="font-bold text-2xl  text-white flex ml-2">
            <Plus size={25} strokeWidth={2.5} className="mt-[5px] ml-2" /> Chủ Đề Khác
          </p>
        </div>

        {/* render thêm các chủ đề khác*/}
        {showMore &&
          genres.slice(5).map((genre, index) => (
            <div
              key={genre}
              className="w-[15%] h-35 rounded-lg flex flex-col justify-center hover:-translate-y-2.5 transition-transform duration-200 cursor-pointer  mt-3 space-y-2"
              style={{
                background: `linear-gradient(to right, ${gradients[(index + 6) % gradients.length][0]}, ${gradients[(index + 6) % gradients.length][1]})`
              }}
            >
              <p className="font-bold text-2xl  text-white ml-2">{genre}</p>
              <p className=" text-white flex ml-2">
                Xem chủ đề <ChevronRight size={25} strokeWidth={2.5} />
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
