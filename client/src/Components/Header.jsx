import React from "react";
import { Link } from "react-router-dom";
import { HiMagnifyingGlass, HiBars4 } from "react-icons/hi2";
import { FaMoon } from "react-icons/fa";

import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="border-b-2 flex justify-between items-center">
      <div className="my-4 flex gap-6 sm:gap-4 md:gap-5 lg:flex-grow">
        <Link
          to="/"
          className="bg-gradient-to-r from-[#a2d2ff] via-[#caf0f8] to-[#ffc8dd] border rounded-[12px] px-2 py-2 text mx-2 my-1 font-semibold"
        >
          Comfort cove
        </Link>
        <form className="hidden lg:flex">
          <input
            type="text"
            placeholder="Search..."
            className="border border-[#ffafcc] rounded-[12px] my-2 py-2 px-2"
          />
        </form>
        <button className="w-12 h-10 bg-gray-100 border-[#ffafcc] rounded my-2 py-2 px-2 lg:hidden">
          <HiMagnifyingGlass className="w-10" />
        </button>
      </div>
      <div className="relative lg:hidden">
        <button
          className="bg-gray-100 border-[#ffafcc] rounded my-2 py-2 px-2"
          onClick={toggleMenu}
        >
          <HiBars4 className="w-[42px] h-5" />
        </button>
        {isMenuOpen && (
          <ul className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg p-2">
            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to="/posts" onClick={closeMenu}>
                Posts
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="hidden lg:flex">
        <ul className="inline-flex gap-6 sm:gap-10 font-semibold">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </div>
      <div>
        <button className="bg-white border rounded-2xl my-4 px-3 py-3 hidden lg:inline">
          <FaMoon />
        </button>
        <Link to="sign-in">
          <button className="border border-[#000000] rounded-xl mx-3 my-5 px-3 py-3">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
