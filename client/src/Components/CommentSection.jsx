import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import message from "./../assets/usericon.png";
import Comments from "./Comments";
import { CgClose } from "react-icons/cg";
import { BsExclamationCircle } from "react-icons/bs";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState(" ");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
        setComment(" ");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      }
    } catch (error) {
      console.log(error.message);
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
      {comments.length === 0 ? (
        <p className="my-2 font-bold">No Comments Yet</p>
      ) : (
        <>
          <div className="flex items-center py-2 px-1 gap-1">
            <p className="font-bold">Comments :</p>
            <div className="border border-gray-500 rounded-sm  px-1">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comments
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
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
              Are you sure you want to delete this Comment?
            </p>
            <div className="flex justify-center gap-[40px]">
              <button
                onClick={() => handleDelete(commentToDelete)}
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

export default CommentSection;
