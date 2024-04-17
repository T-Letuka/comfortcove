import React, { useState } from "react";
import icon from "./../assets/usericon.png";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/useSlice";

import { useDispatch } from "react-redux";

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUserComplete, setUpdateUserComplete] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data.message));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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
  const handleSignout = async () => {
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
          className="self-center w-[50%] uppercase py-2 px-10 hover:underline 
        border-4 border-pink-500 hover:border-[#8A2BE2] rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"} className="flex flex-col">
            <button
              className="self-center w-[50%] uppercase py-2 px-10 hover:underline 
        border-[5px] border-[#8A2BE2] hover:bg-[#8A2BE2]  hover:text-white rounded-md mb-4"
            >
              Create A post
            </button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-2 ">
        <span
          onClick={toggleModal}
          className="cursor-pointer uppercase hover:underline"
        >
          Delete account
        </span>
        <span
          onClick={handleSignout}
          className="cursor-pointer uppercase hover:underline"
        >
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h1 className="flex justify-end mb-5">
              <CgClose onClick={toggleModal} size={25} />
            </h1>
            <span className="flex justify-center mt-2 mb-4 items-center">
              <BsExclamationCircle size={60} color="red" />
            </span>

            <p className="mb-[50px] uppercase opacity-70 text-[18px]">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center gap-[40px]">
              <button
                onClick={handleDelete}
                className="bg-[#FF0800] text-white py-3 font-semibold px-4 rounded-md hover:underline"
              >
                Delete
              </button>
              <button
                onClick={toggleModal}
                className="bg-gray-300 text-black py-3 px-4 rounded-md hover:bg-black hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashProfile;
