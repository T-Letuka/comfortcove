import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage("An error occurred while signing up.");
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
            hurdles
          </p>
        </div>
        {/*right side*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="mt-2 flex flex-col">
              <label htmlFor="username">Your Username</label>
              <input
                type="text"
                placeholder="Username"
                className="border rounded-md px-3 py-3"
                onChange={handleChange}
                id="username"
              />
            </div>
            <div className="mt-2 flex flex-col">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                placeholder="Email"
                className="border rounded-md px-3 py-3"
                onChange={handleChange}
                id="email"
              />
            </div>
            <div className="mt-2 flex flex-col">
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                className="border rounded-md px-3 py-3"
                onChange={handleChange}
                id="password"
              />
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
      {errorMessage && <ToastContainer />}
    </div>
  );
};

export default Signup;
