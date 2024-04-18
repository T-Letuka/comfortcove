import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { BsExclamationCircle } from "react-icons/bs";

const DashboardPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  const handleDelete = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="text-red-600 font-medium hover:underline cursor-pointer"
                    >
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
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full  mt-1 self-center font-semibold text-lg hover:text-blue-700 hover:underline"
            >
              Show More
            </button>
          )}
        </div>
      ) : (
        <p>No posts</p>
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
              Are you sure you want to delete this Post?
            </p>
            <div className="flex justify-center gap-[40px]">
              <button
                onClick={handleDelete}
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

export default DashboardPost;
