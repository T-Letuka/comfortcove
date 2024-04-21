import React from "react";
import message from "./../assets/dash.png";

const DashPicture = () => {
  return (
    <div>
      <div className="w-[50%] h-[50%] mt-2 mx-auto">
        <h1 className="font-serif tracking-wider text-2xl underline uppercase text-center">
          Dashboard
        </h1>
        <img src={message} alt="header" className="w-[80%] mt-2 mx-auto" />
      </div>
    </div>
  );
};

export default DashPicture;
