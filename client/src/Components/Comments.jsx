import React, { useEffect, useState } from "react";
import message from "./../assets/usericon.png";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

import moment from "moment";

const Comments = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [Comment]);
  return (
    <div className="flex p-4 border-b border-gray-200 ">
      <div className="flex-shrink-0 mr-3">
        <img
          src={message}
          alt={user.username}
          className="w-10 h-10 bg-gray-200 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-semibold  mr-1 text-xs md:text-md truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-xs text-gray-600 md:text-md">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-600 pb-2 font-serif">{comment.content}</p>
        <div className="flex items-center gap-2 pt-2 text-xs border-t max-w-fit">
          <button
            onClick={() => onLike(comment._id)}
            className={`text-red-300 text-xl hover:text-[#FF0800] hover:text-2xl ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-[#8A2BE2]"
            }`}
          >
            <AiFillHeart />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "Likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
