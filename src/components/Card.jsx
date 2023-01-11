import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import Button from "./Button";

const Card = ({ movie, movie: { poster_path, title, vote_average, release_date } }) => {
  const [date, setDate] = useState("date");

  useEffect(() => {
    handleDate();
    //eslint-disable-next-line
  }, []);

  const handleDate = () => {
    const tanggal = release_date.split("-");
    const newDate = new Date(tanggal[0], tanggal[1], tanggal[2]);
    setDate(newDate.toDateString());
  };

  return (
    <>
      <div className="mx-4 bg-slate-600 rounded-lg h-auto py-4 flex flex-col justify-between items-center">
        <div className="w-44">
          <img className=" rounded-lg" src={poster_path ? `${process.env.REACT_APP_IMG_URL}${poster_path}` : `https://via.placeholder.com/176x265?text=No+image`} alt={title} />
        </div>

        <div className="my-2">
          <h3 className="font-bold text-xl text-center text-neutral-100">{title}</h3>
        </div>

        <div className="relative">
          <BsStarFill className="absolute fill-current text-yellow-400 top-[3px]" />
          <p className="ml-6 text-neutral-100">{vote_average.toFixed(1)}</p>
        </div>

        <div className="text-neutral-100 text-base">
          <p>{date}</p>
        </div>

        <div className="flex flex-col h-32 justify-between">
          <div className="px-8 text-center">
            <Button buttonText="Detail" />
          </div>

          <div className="px-8 rounded-lg cursor-pointer">
            <Button buttonText="Add to Favorite" movie={movie} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
