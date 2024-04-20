import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Components/DashSidebar";
import DashProfile from "../Components/DashProfile";
import DashboardPost from "../Components/DashboardPost";
import DashUser from "../Components/DashUser";
import DashComments from "../Components/DashComments";

const Dashboard = () => {
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/*side bar*/}
        <DashSidebar />
      </div>
      <div className="md:flex-1">
        {/*right side */}
        {tab === "profile" && <DashProfile />}
        {/*posts */}
        {tab === "posts" && <DashboardPost />}
        {/*users*/}
        {tab === "users" && <DashUser />}
        {/*comments*/}
        {tab === "comments" && <DashComments />}
      </div>
    </div>
  );
};

export default Dashboard;
