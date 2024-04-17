import React, { useState } from "react";
import icon from "./../assets/usericon.png";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/useSlice";
import { useDispatch } from "react-redux";

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUserComplete, setUpdateUserComplete] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes Made!!");
      return;
    }
    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserComplete("User updated Successfully !!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(data.message); //i duplicated error message(sorry)
    }
  };
  return (
    <div className="max-w-lg mx-auto p-2 w-full">
      <h1 className="uppercase tracking-widest font-semibold text-center py-8">
        My Profile
      </h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />
        <input
          type="email"
          id="emai"
          placeholder="username"
          className="border-pink-300 rounded-md border py-2 px-2 my-2"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border-pink-300 rounded-md border py-2 px-2 my-2"
          onChange={handleChange}
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
      {updateUserComplete && (
        <div className="font-bold text-red-600 tracking-widest text-center mt-2">
          {updateUserComplete}
        </div>
      )}
      {updateUserError && (
        <div className="font-bold text-lg tracking-widest text-center mt-2 text-blue-500">
          {updateUserError}
        </div>
      )}
    </div>
  );
};

export default DashProfile;
