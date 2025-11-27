import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="w-full min-h-[190px] bg-bgdefault pt-5  flex flex-col items-center">
      <div className="flex gap-5">
        <button
          className="w-[45px] h-[45px] bg-white  rounded-full hover:-translate-y-1 transition-transform duration-100"
        >
          <FontAwesomeIcon
            icon={faFacebookF}
            className="text-black py-[6px] px-[2px] text-[27px] "
          />
        </button>
        <button
          className="w-[45px] h-[45px] bg-white  rounded-full hover:-translate-y-1 transition-transform duration-100"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-black py-[6px] px-[2px] text-[27px] "
          />
        </button>
        <button
          className="w-[45px] h-[45px] bg-white  rounded-full hover:-translate-y-1 transition-transform duration-100"
        >
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-black py-[6px] px-[2px] text-[27px] "
          />
        </button>
      </div>
      <div className="text-white flex items-center gap-2 mt-8 ">
        <p className="text-[16px]">Info</p>
        <FontAwesomeIcon icon={faCircle} className="text-[4px]"/>
        <p className="text-[16px]">Support</p>
        <FontAwesomeIcon icon={faCircle} className="text-[4px]"/>
        <p className="text-[16px]">Marketing</p>
      </div>
      <div className="text-white flex items-center gap-2 mt-2 ">
        <p className="text-[16px]">Terms of Use</p>
        <FontAwesomeIcon icon={faCircle} className="text-[4px]"/>
        <p className="text-[16px]">Privacy Policy</p>
      </div>
      <p className="text-[#5E5F64] mt-2">@ 2025 MovieWeb</p>
    </div>
  );
};

export default Footer;
