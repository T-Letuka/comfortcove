import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowBarRight } from "react-icons/bs";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex h-screen">
      <div className="bg-[#F2F3F4] w-60">
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
              Sign Out <BsArrowBarRight />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashSidebar;
