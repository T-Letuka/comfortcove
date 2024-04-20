import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CallToAction from "../Components/CallToAction";
import CommentSection from "../Components/CommentSection";
import PostCards from "../Components/PostCards";

const Posts = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchPost();
  }, [postSlug]);
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=2`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center text-[30px]">
        <AiOutlineLoading3Quarters /> <br />
        Working on it
      </div>
    );
  return (
    <main className="p-3  flex flex-col max-w-6xl mx-auto min-h-screen border shadow-sm shadow-purple-400 mt-2 border-gray-100">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center hover:text-lg rounded-lg hover:font-semibold mt-4"
      >
        <button className="border-2 border-[#FF91AF] p-3 rounded-lg font-serif text-md  ">
          {post && post.category}
        </button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="p-3 w-[50%] self-center mt-10 h-[50%] shadow-sm border border-gray-100 shadow-gray-100"
      />
      <div className=" mx-auto w-1/2 max-w-2xl flex justify-between p-3 border border-gray-100 text-md font-semibold opacity-85">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full mt-2 post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full mt-5">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">RECENT POSTS</h1>
        <div className="flex flex-wrap gap-5 mt-2 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCards key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default Posts;
