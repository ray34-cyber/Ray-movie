import React from "react";
import Button from "./Button";

const Welcome = ({ handleInput, input, handleEnterSearch }) => {
  return (
    <>
      <div className="bg-[url('https://source.unsplash.com/1600x900/?movie')] hover:bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('https://source.unsplash.com/1600x900/?movie')] bg-blend-overlay bg-cover bg-center opacity-100 mt-4 py-8 w-full h-auto ">
        <div>
          <h1 className="text-white text-5xl mx-4 lg:text-6xl">Welcome to Ray's Cinema</h1>
          <h2 className="text-3xl text-white my-4 mx-4 mb-8 lg:text-5xl">There are millions of movies to explore</h2>
        </div>
        <div className="container mx-auto flex justify-start items-center">
          <input
            type="text"
            className="basis-full text-2xl relative text-white mx-3 bg-transparent h-10 placeholder:text-white placeholder:italic placeholder:text-2xl font-medium border-[4px] transition duration-500 
            ease-in-out border-teal-400 focus:outline-none  
            focus:border-teal-600 rounded-lg placeholder:opacity-80"
            onChange={handleInput}
            value={input}
            placeholder="Explore your movie ..."
            onKeyPress={handleEnterSearch}
          />
          <Button buttonText="Search" />
        </div>
      </div>
    </>
  );
};

export default Welcome;
