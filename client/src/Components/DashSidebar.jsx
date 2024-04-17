import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowBarRight } from "react-icons/bs";
import { signoutSuccess } from "../redux/user/useSlice";

import { useDispatch } from "react-redux";
const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async (e) => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex">
      <div className="bg-[#F2F3F4] md:w-60 md:h-screen w-full ">
        <h1 className="border-b-2 mt-2 mb-2 text-center tracking-widdest text-black font-semibold uppercase ">
          My SideBar
        </h1>
        <ul className="p-2">
          <Link to="/dashboard?tab=profile">
            <li
              className={`py-2 px-4 rounded-md hover:bg-gray-400 cursor-pointer text-center ${
                tab === "profile" && "bg-gray-400"
              }`}
            >
              Profile
            </li>
          </Link>
          <li className="py-2 px-4 rounded-md font-semibold hover:bg-red-400 cursor-pointer ">
            <div className="flex items-center gap-3 justify-center">
              <span onClick={handleSignout}> Sign Out</span>
              <BsArrowBarRight />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashSidebar;
