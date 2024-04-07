import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="mt-20 w-full">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          {/*left side*/}
          <Link
            to="/"
            className="bg-gradient-to-r from-[#a2d2ff] via-[#caf0f8] to-[#ffc8dd] border rounded-[12px] px-2 py-2 text-4xl mx-2 my-1 font-semibold"
          >
            Comfort cove
          </Link>
          <p className="text-md mt-8 mr-4">
            Step into our welcoming blog, designed to be your haven for
            guidance, emotional support, and discovering ways to overcome life's
            hurdles
          </p>
        </div>
        {/*right side*/}
        <div className="flex-1">
          <form className=" flex flex-col gap-4">
            <div className="mt-2 flex flex-col">
              <label value="Your username">Your Username </label>
              <input
                type="text"
                placeholder="username..."
                className="border rounded-md px-3 py-3 "
              />
            </div>
            <div className="mt-2 flex flex-col">
              <label value="Your username">Your Email </label>
              <input
                type="text"
                placeholder="Email"
                className="border rounded-md px-3 py-3"
              />
            </div>
            <div className="mt-2 flex flex-col">
              <label value="Your password">Your Password </label>
              <input type="text" className="border rounded-md px-3 py-3" />
            </div>
            <button className="border-4 border-[#cdb4db] font-bold rounded-[20px] px-3 py-3 hover:border-[#ff006e]">
              Sign Up
            </button>
          </form>
          <div className="mt-5 flex gap-2 text-md">
            <span>Have an Account?</span>
            <Link to="/sign-in" className="text-blue-500 hover:text-red-400">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
