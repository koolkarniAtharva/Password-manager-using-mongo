import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-8 py-4">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-cyan-500">&lt;</span>
          <span>Pass</span>
          <span className="text-cyan-500">OP/&gt;</span>
        </div>
        {/* ✅ Wrap the img inside an anchor tag */}
        <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
          <img className="invert w-10 ring-white ring-1 cursor-pointer" src="/icons/github.svg" alt="GitHub Logo" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
