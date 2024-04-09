import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="pt-10 pb-15 w-full">
      <div className="border-2 border-[#FC0FC0] rounded-lg">
        <div className="grid grid-cols-2 w-full ">
          <div className="mt-4">
            <Link
              to="/"
              className="bg-gradient-to-r from-[#a2d2ff] via-[#caf0f8] to-[#ffc8dd] border rounded-[12px] px-2 py-2 text mx-2 my-1 font-semibold"
            >
              Comfort cove
            </Link>
          </div>

          <div>
            <h3 className="tracking-widest font-semibold underline">LEGAL</h3>
            <p className="opacity-70 hover:underline hover:text-pink-600">
              Terms & Conditions
            </p>
            <p className="opacity-70 hover:underline hover:text-pink-600">
              Privacy and Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
