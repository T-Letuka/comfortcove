import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMagnifyingGlass, HiBars4 } from "react-icons/hi2";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  const path = useLocation().pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="border-b-2 flex flex-wrap justify-between items-center">
      <div className="my-4 flex gap-4 sm:gap-6 md:gap-8">
        <Link
          to="/"
          className="bg-black  text-white border rounded-[12px] px-2 py-2 text mx-2 my-1 font-semibold"
        >
          Comfort cove
        </Link>
      </div>
      <div className="relative lg:hidden flex items-center">
        <button
          className=" border-[#ffafcc] rounded my-2 py-2 px-2 mx-6 "
          onClick={toggleMenu}
        >
          <HiBars4 className="w-10 h-10 " />
        </button>
        {currentUser ? (
          <Link to="/dashboard">
            <button className="border-4 border-[#d00000] text-sm rounded-xl mx-2 my-5 px-3 py-3 sm:mx-8 hover:border-[#03045e]">
              dashboard
            </button>
          </Link>
        ) : (
          <Link to="/sign-in">
            <button className="border-4 border-[#d00000] rounded-xl mx-6 my-5 px-3 py-3 hover:border-[#03045e]">
              Sign In
            </button>
          </Link>
        )}
        {isMenuOpen && (
          <>
            <ul className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg p-3">
              <li className="p-1 hover:bg-pink-600 hover:font-bold">
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className="p-1 hover:bg-pink-600 hover:font-bold">
                <Link to="/about" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li className="p-1 hover:bg-pink-600 hover:font-bold">
                <Link to="/postpage" onClick={closeMenu}>
                  Posts
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-1">
        <ul className="inline-flex gap-6 sm:gap-10 font-bold text-[20px]">
          <li>
            <Link to="/" className="text-black hover:text-[#ff006e]">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-black hover:text-[#ff006e]">
              About
            </Link>
          </li>
          <li>
            <Link to="/postpage" className="text-black hover:text-[#ff006e]">
              Posts
            </Link>
          </li>
        </ul>
        {currentUser ? (
          <Link to="/dashboard">
            <button className="border-4 border-[#d00000] rounded-xl  mx-6 my-5 px-3 py-3 hover:border-[#03045e]">
              DashBoard
            </button>
          </Link>
        ) : (
          <Link to="/sign-in">
            <button className="border-4 border-[#d00000] rounded-xl mx-6 my-5 px-3 py-3 hover:border-[#03045e]">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
