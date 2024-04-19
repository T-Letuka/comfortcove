import React from "react";
import message from "./../assets/help.png";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div
      className="flex flex-col sm:flex-row p-4 border border-pink-400 *:justify-center
  items-center rounded-tl-3xl text-center"
    >
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl tracking-widest font-semibold">
          Guiding Lights: Your Sanctuary for Insight and Tips
        </h2>
        <p className="text-gray-500 my-2 text-xl">
          Strength is forged in adversity, resilience in hardship.
        </p>
        <button
          className="rounded-xl w-full text-white bg-gradient-to-r from-[#8A2BE2] 
        via-[#702963] to-[#B53389] border py-2 font-bold tracking-wide"
        >
          <Link to="/posts">Go To Posts</Link>
        </button>
      </div>
      <div className="p-6 flex-1">
        <img src={message} alt="an image" className="w-[50%] h-[50%] mx-auto" />
      </div>
    </div>
  );
};

export default CallToAction;
