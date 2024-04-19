import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import message from "./../assets/usericon.png";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState(" ");
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 300) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-2 my-5 text-gray-600 text-md">
          <p className="font-bold ">Signed in as:</p>
          <img
            src={message}
            alt="user icon"
            className="h-5 w-5 object-cover rounded-full"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-md text-[#4B0082]"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-md text-[#4B0082] my-5 flex items-center gap-3 ">
          <p className="font-bold">You Must Login to Comment:</p>
          <Link
            to={"/sign-in"}
            className="font-bold hover:text-cyan-800 hover:underline"
          >
            Sign-in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-[#9400D3] rounded-md p-3"
        >
          <textarea
            placeholder="Add A Comment..."
            type="text"
            rows={3}
            maxLength={300}
            className="w-full border border-gray-300 rounded-md p-3"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="opacity-60">
              {300 - comment.length} characters remaining
            </p>
            <button className="border border-[#9400D3] p-2 rounded-lg">
              Submit
            </button>
          </div>
          {commentError && (
            <div className="bg-red-400 text-black p-3">{commentError}</div>
          )}
        </form>
      )}
    </div>
  );
};

export default CommentSection;
