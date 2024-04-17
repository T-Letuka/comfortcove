import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className=" underline text-center text-3xl my-7 font-semibold">
        Create a Post
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            className="py-4 px-4 flex-1 border-2 tracking-widest"
            id="title"
            required
          />
          <select
            id="categories"
            name="categories"
            className="py-4 px-4 border"
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
          />
          <button className="p-4 text-[18px] font-semibold border-4 border-[#FFC0CB] rounded-lg  hover:border-purple-800">
            Upload Image
          </button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write Something..."
          className="h-72 mb-12"
          required
        />
        <button className="w-full border-4 p-4 rounded-full text-xl font-semibold border-purple-900 hover:border-pink-600">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
