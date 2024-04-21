import React from "react";
import message from "./../assets/header.png";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col gap-6 px-3 max-w-6xl mx-auto">
        <h1 className="text-2xl font-sans lg:text-2xl mt-2 text-center">
          Wherever you go, go with all your heart.
          <span className="italic ml-2">--Confucius</span>
        </h1>
        <img src={message} alt="header" />
        <p className="text-gray-500 text-xl font-mono sm:text-lg">
          Enter freely, with hearts open wide. Here, time flows gentle, no need
          to hide. In this cozy nest, you will find your clan, where laughter
          reigns and hugs began.
        </p>
      </div>
    </div>
  );
};

export default Home;
