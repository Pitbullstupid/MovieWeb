import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronUp, faCrown } from "@fortawesome/free-solid-svg-icons";

const PremiumCard = ({ label, price, oldPrice, duration, onSelect }) => {
  return (
    <div className="w-85 h-110 bg-gradient-to-tr from-[#212B5F] to-[#6B7FFA] rounded-2xl mx-auto mt-10 hover:scale-105 transition-smooth duration-300 mb-5 cursor-pointer">

      <div className="w-[90%] mx-auto">
        <h1 className="pt-3 text-white font-bold text-2xl text-center">
          {label}{" "}
          <FontAwesomeIcon icon={faCrown} className="text-[#FFD875] ml-2" />
        </h1>

        {/* Price */}
        <div className="relative flex mt-4 items-center gap-3 justify-center">
          <p className="text-[#FFD875] font-bold text-xl blur-[2px] relative">
            {oldPrice.toLocaleString("vi-VN")}đ
          </p>
          <div className="absolute bg-[#FFD875] w-[2px] h-[50px] rotate-58 blur-[2px] left-[75px]"></div>
          <p className="text-[#FFD875] font-bold text-xl relative">
            {price.toLocaleString("vi-VN")}đ
          </p>
          <div>
            <p className="text-[10px] mt-1 px-[2px] bg-white rounded-[5px] text-black font-semibold">
              Giảm {Math.round((1 - price / oldPrice) * 100)}%
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-7 text-white text-[18px] space-y-3 w-full ml-2">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCheck} />
            <p>Tắt quảng cáo</p>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCheck} />
            <p>Xem phim chất lượng cao</p>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCheck} />
            <p>Thay đổi Avatar</p>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCheck} />
            <p>Gắn nhãn Premium</p>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCheck} />
            <p>Chat with agent AI</p>
          </div>
        </div>

        {/* Button */}
        <button
          className="w-[90%] mx-auto h-[40px] bg-white flex items-center justify-center mt-13 rounded-xl gap-2 hover:opacity-90 font-semibold cursor-pointer "
          onClick={() => onSelect(duration, price)}
        >
          Chọn
          <div className="flex flex-col mt-[2px]">
            <FontAwesomeIcon icon={faChevronUp} className="text-black text-[10px]" />
            <FontAwesomeIcon icon={faChevronUp} className="text-black text-[10px]" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default PremiumCard;
