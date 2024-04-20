import React from "react";
import { Link } from "react-router-dom";

const PostCards = ({ post }) => {
  return (
    <div
      className="group relative w-full border-4 border-pink-400 hover:border-2 h-[400px] overflow-hidden
  rounded-lg sm:w-[430px] transition-all"
    >
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[250px] w-[90%] group-hover:h-[240px] transition-all p-4
        duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-md">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border-2 border-pink-500 
        text-black font-bold hover:bg-[#F2C1D1] transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read Post
        </Link>
      </div>
    </div>
  );
};

export default PostCards;
