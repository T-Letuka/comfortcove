import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        const post = data.posts[0];

        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an Image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed!!");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload Failed!!");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong!");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className=" underline text-center text-3xl my-7 font-semibold">
        Update a Post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            className="py-4 px-4 flex-1 border-2 tracking-widest"
            id="title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <select
            id="categories"
            name="categories"
            className="py-4 px-4 border"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select A Category</option>
            <option value="relationships">Relationships</option>
            <option value="positive-thinking">Positive Thinking</option>
            <option value="coping-mechanism">Coping Mechanism</option>
            <option value="life-transitions">Life Transition</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between  border-4 border-pink-300 border-dotted p-3">
          <input
            type="file"
            id="profile-picture"
            name="profile-picture"
            accept="image/*"
            className="border bg-slate-200 rounded-md py-1"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
            className="p-4 text-[18px] font-semibold border-4 border-[#FFC0CB] rounded-lg  hover:border-purple-800"
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={parseInt(imageUploadProgress)}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
        {imageUploadError && (
          <div className="text-red-600 font-semibold bg-red-100 p-3 rounded-md">
            {imageUploadError}
          </div>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="uploaded"
            className="w-80 h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write Something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <button className="w-full border-4 p-4 rounded-full text-xl font-semibold border-purple-900 hover:border-pink-600">
          Update
        </button>
        {publishError && (
          <div className="font-semibold bg-red-200 text-red-700 rounded-md">
            {publishError}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
