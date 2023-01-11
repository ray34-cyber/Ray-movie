import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { RootContext } from "../context/context";
import { RiCloseCircleFill } from "react-icons/ri";

const Favorite = () => {
  const [favorites, setFavorites] = useContext(RootContext).fav;

  const handleCloseFavorite = (id) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="h-[100vh] w-full bg-[url('https://source.unsplash.com/1600x900/?movie')]  bg-cover py-14 ">
        <h1 className="text-center text-white text-4xl">Favorite Page</h1>
        <div className="flex flex-wrap justify-center">
          {favorites
            ? favorites.map((movie) => {
                return (
                  <div key={movie.id} className="w-44 mx-12 relative h-auto rounded-lg pb-6 my-10 bg-slate-600 ">
                    <img className="w-44 rounded-t-lg" src={movie.poster_path ? `${process.env.REACT_APP_IMG_URL}${movie.poster_path}` : `https://via.placeholder.com/176x265?text=No+image`} alt={movie.title} />
                    <p className="text-center text-white text-xl mt-6 ">{movie.title}</p>
                    <button className="absolute -top-3 -right-3 cursor-default">
                      <RiCloseCircleFill size={30} className="fill-current text-red-500 cursor-pointer" onClick={() => handleCloseFavorite(movie.id)} />
                    </button>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Favorite;
