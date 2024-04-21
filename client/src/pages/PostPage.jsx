import PostCards from "../Components/PostCards";
import React, { useState } from "react";
import { useEffect } from "react";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="mx-auto">
      <div>
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 p-3">
              {posts.map((post) => (
                <PostCards key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
