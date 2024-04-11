import React from "react";
import icon from "./../assets/usericon.png";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-2 w-full">
      <h1 className="uppercase tracking-widest font-semibold text-center py-8">
        My Profile
      </h1>
      <form className="flex flex-col gap-2">
        <img
          src={icon}
          alt="userimg"
          className="rounded-full cursor-not-allowed shadow-md shadow-black w-[80px] border-2 border-pink-400 self-center"
        />
        <p className="text-center opacity-40">
          Please note you can't change profile picture
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border-pink-300 rounded-md border-2 py-2 px-2 my-2"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          id="emai"
          placeholder="username"
          className="border-pink-300 rounded-md border py-2 px-2 my-2"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="password"
          className="border-pink-300 rounded-md border py-2 px-2 my-2"
        />
        <button
          className="self-center uppercase py-2 px-10 hover:underline 
        border-2 border-pink-500 hover:border-[#8A2BE2] rounded-md"
        >
          update
        </button>
      </form>
      <div className="text-red-500 flex justify-between mt-2 ">
        <span className="cursor-pointer uppercase hover:underline">
          Delete account
        </span>
        <span className="cursor-pointer uppercase hover:underline">
          Sign out
        </span>
      </div>
    </div>
  );
};

export default DashProfile;
