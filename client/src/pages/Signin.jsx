import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  SignInSuccess,
  signInFailure,
} from "../redux/user/useSlice";

import OAuth from "../Components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(SignInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="mt-20 w-full">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          {/*left side*/}
          <Link
            to="/"
            className="bg-gradient-to-r from-[#a2d2ff] via-[#caf0f8] to-[#ffc8dd] border rounded-[12px] px-2 py-2 text-4xl mx-2 my-1 font-semibold"
          >
            Comfort Cove
          </Link>
          <p className="text-md mt-8 mr-4">
            Step into our welcoming blog, designed to be your haven for
            guidance, emotional support, and discovering ways to overcome life's
            hurdles.
            <br />
            <span className="font-semibold">
              You can sign in with your email and password, or with Google
            </span>
          </p>
        </div>
        {/*right side*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="mt-2 flex flex-col ">
              <label htmlFor="email" className="tracking-widest">
                Your Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="border rounded-md px-3 py-3 "
                onChange={handleChange}
                id="email"
              />
            </div>
            <div className="mt-2 flex flex-col">
              <label htmlFor="password" className="tracking-widest">
                Your Password
              </label>
              <input
                type="password"
                className="border rounded-md px-3 py-3"
                onChange={handleChange}
                id="password"
              />
            </div>
            <button
              className="border-4 border-[#cdb4db] font-bold rounded-[20px] px-3 py-3 hover:border-[#ff006e]"
              disabled={loading}
            >
              {loading ? <span className="pl-3">Loading...</span> : "Sign In"}
            </button>
            <OAuth />
          </form>
          <div className="mt-5 flex gap-2 text-md">
            <span>Don't Have an Account?</span>
            <Link to="/sign-up" className="text-blue-500 hover:text-red-600">
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <div className="mt-4 font-semibold text-red-400 text-[20px] tracking-widest text-center">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
