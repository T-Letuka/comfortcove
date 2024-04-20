import React, { useEffect, useState } from "react";
import message from "./../assets/usericon.png";
import moment from "moment";

const Comments = ({ comment }) => {
  const [user, setUser] = useState({});
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
      </div>
    </div>
  );
};

export default Comments;
