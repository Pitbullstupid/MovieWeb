import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="w-full h-[150px] bg-[#272A39] flex items-start justify-between px-6 py-5">
        <div className="max-w-[60%] space-y-3">
          <div className="flex items-center gap-5">
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#db5840] to-[#b6b2b2] w-fit">
              MovieWeb
            </p>

            <div className="flex gap-2.5">
              <div className="w-[35px] h-[35px] rounded-full border-[1px] border-gray-300 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="text-red-600 text-lg"
                />
              </div>
              <div className="w-[35px] h-[35px] rounded-full border-[1px] border-gray-300 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-blue-600 text-lg"
                />
              </div>
              <div className="w-[35px] h-[35px] rounded-full border-[1px] border-gray-300 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-white text-lg"
                />
              </div>
            </div>
          </div>

          <p className="text-sm text-[#abadb9]">
            Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh,
            lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ,
            phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái
            Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực
            tuyến hay nhất 2024 chất lượng 4K!
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-white">
            Contact with us : 0123456789
          </p>
        </div>
      </div>
      <div className="w-full h-[30px] bg-[#272A39]">
        <p className="text-center font-semibold text-white">@2025 No Copyright</p>
      </div>
    </div>
  );
};

export default Footer;
