import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  return (
    <div>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <div className="overflow-x-auto mt-2 border md:mx-auto p-3 scrollbar scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border  text-[14px]">DATE UPDATED</th>
                <th className="px-4 py-2 uppercase border text-[15px]">
                  Image
                </th>
                <th className="px-4 py-2 uppercase border text-[15px]">
                  Post Title
                </th>
                <th className="px-4 py-2 uppercase border text-[15px]">
                  Category
                </th>
                <th className="px-4 py-2 uppercase border text-[15px]">
                  Delete
                </th>
                <th className="px-4 py-2 uppercase border text-[15px]">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {userPosts.map((post) => (
                <tr key={post.id}>
                  <td className="border px-4 py-2">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-20 object-cover bg-slate-100"
                      />
                    </Link>
                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="border px-4 py-2">{post.category}</td>
                  <td className="border px-4 py-2">
                    <button className="text-red-600 font-medium hover:underline cursor-pointer">
                      Delete
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/update-post/${post._id}`}>
                      <button className="text-cyan-800 font-medium hover:underline cursor-pointer">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default DashboardPost;
