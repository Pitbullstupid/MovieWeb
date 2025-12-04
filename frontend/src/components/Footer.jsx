import React from 'react';
import { Facebook, Instagram, Twitter, Circle } from 'lucide-react';

const Footer = () => {
  return (
    <div className="w-full min-h-[190px] bg-[#0F111A] pt-8 pb-6 flex flex-col items-center">
      <div className="flex gap-5">
        <button className="w-[45px] h-[45px] bg-gradient-to-br from-blue-500 to-blue-600 rounded-full hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group">
          <Facebook className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button className="w-[45px] h-[45px] bg-gradient-to-br from-pink-500 to-purple-600 rounded-full hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center group">
          <Instagram className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button className="w-[45px] h-[45px] bg-gradient-to-br from-sky-400 to-blue-500 rounded-full hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-400/50 transition-all duration-300 flex items-center justify-center group">
          <Twitter className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
      
      <div className="text-slate-300 flex items-center gap-3 mt-8">
        <a href="#" className="text-[15px] hover:text-white transition-colors">Info</a>
        <Circle className="w-1 h-1 fill-slate-600 text-slate-600" />
        <a href="#" className="text-[15px] hover:text-white transition-colors">Support</a>
        <Circle className="w-1 h-1 fill-slate-600 text-slate-600" />
        <a href="#" className="text-[15px] hover:text-white transition-colors">Marketing</a>
      </div>
      
      <div className="text-slate-300 flex items-center gap-3 mt-3">
        <a href="#" className="text-[15px] hover:text-white transition-colors">Terms of Use</a>
        <Circle className="w-1 h-1 fill-slate-600 text-slate-600" />
        <a href="#" className="text-[15px] hover:text-white transition-colors">Privacy Policy</a>
      </div>
      
      <p className="text-slate-500 mt-4 text-sm">© 2025 MovieWeb</p>
    </div>
  );
};

export default Footer;