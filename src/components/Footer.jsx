import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center bottom-0 w-full">
      <div className="logo font-bold text-white text-2xl py-2">
        <span className="text-cyan-500">&lt;</span>
        <span>Pass</span>
        <span className="text-cyan-500">OP/&gt;</span>
      </div>
      <div className="flex justify-center items-center text-2xl">
        Created with <img className='w-8 mx-2' src="/icons/heart.png" /> by Atharva Kulkarni
      </div>
    </div>
  );
};

export default Footer;
