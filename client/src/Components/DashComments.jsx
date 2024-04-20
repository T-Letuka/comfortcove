import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";
import { BsExclamationCircle } from "react-icons/bs";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {currentUser.isAdmin && comments.length > 0 ? (
        <div className="overflow-x-auto mt-2 border md:mx-auto p-3 scrollbar scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border  text-[14px]">DATE CREATED</th>
                <th className="px-4 py-2 uppercase border text-[15px]">
                  comment content
                </th>
                <th className="px-4 py-2 uppercase border text-[15px]">
                  number of likes
                </th>
                <th className="px-4 py-2 uppercase border text-[15px]">
                  Postid
                </th>
                <th className="px-4 py-2 uppercase border text-[15px]">
                  userid
                </th>
                <th className="px-4 py-2 uppercase border text-[15px]">
                  delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" key={comments._id}>
              {comments.map((comment) => (
                <tr>
                  <td className="border px-4 py-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{comment.content}</td>
                  <td className="border px-4 py-2">{comment.numberOfLikes}</td>
                  <td className="border px-4 py-2">{comment.postId}</td>
                  <td className="border px-4 py-2">{comment.userId}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="text-red-600 font-medium hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
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
        <p>No Comments</p>
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

export default DashComments;
