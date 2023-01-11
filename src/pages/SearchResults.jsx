import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

const SearchResults = () => {
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [moviesSearchPage, setMoviesSearchPage] = useState(1);
  const [searchMorebutton, setSearchMorebutton] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getMovieFromSearch = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/search/movie`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          query: location.state.input,
          page: moviesSearchPage,
        },
      })
      .then((response) => {
        if (moviesSearchPage <= response.data.total_pages) {
          if (moviesSearchPage === 1) {
            setMoviesSearch([...response.data.results]);
          } else {
            setMoviesSearch([...moviesSearch, ...response.data.results]);
            if (moviesSearchPage === response.data.total_pages) {
              setSearchMorebutton(false);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMovieFromSearch();
    //eslint-disable-next-line
  }, [moviesSearchPage]);

  const handleMoviesSearchPage = () => {
    setMoviesSearchPage(moviesSearchPage + 1);
  };

  const handleDetailPage = (id) => {
    navigate(`/detail/${id}`, {
      state: {
        id,
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full px-6">
        <div className="flex justify-center">
          <button className="flex flex-col items-center text-3xl text-emerald-400 cursor-default text-center">
            Go Back Home
            <BsArrowLeftCircleFill size={45} className="text-teal-400 fill-current mt-4 cursor-pointer animate-animateArrowLeft" onClick={() => navigate(-1)} />
          </button>
        </div>
        {moviesSearch.map((movie) => {
          return (
            <div key={movie.id} className="flex flex-col items-center w-full bg-slate-600 pb-4 rounded-lg mx-auto mt-8 mb-8 md:flex-row md:py-0">
              <div className="mr-4 rounded-lg bg-teal-400 h-[356px] md:h-[306px]">
                <img className=" rounded-lg h-[356px] md:h-[306px]" src={movie.poster_path ? `${process.env.REACT_APP_IMG_URL}${movie.poster_path}` : `https://via.placeholder.com/176x265?text=No+image`} alt="" />
              </div>
              <div className="flex flex-col items-center px-8 ml-10">
                <div className="mt-4">
                  <h3 className="mb-4 font-bold text-xl text-center text-neutral-100">{movie.title}</h3>
                </div>
                <div className="relative">
                  <BsStarFill className="absolute fill-current text-yellow-400 top-1 left-8" />
                  <p className="mb-4 text-neutral-100">{movie.vote_average}</p>
                </div>
                <div className="flex flex-col h-32 self-auto justify-between">
                  <button
                    className="relative inline-block py-2 px-7 text-[#03e9f4] uppercase transition duration-500 
         ease-in-out tracking-[4px] overflow-hidden hover:bg-[#03e9f4] hover:text-[#050801] hover:shadow-[0_0_5px_#03e9f4,0_0_25px_#03e9f4,0_0_50px_#03e9f4,0_0_200px_#03e9f4] hover:box-reflect"
                    onClick={() => handleDetailPage(movie.id)}
                  >
                    <span className="hue-rotate-[90deg] absolute block top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent to-[#03e9f4] animate-animate1"></span>
                    <span className="hue-rotate-[180deg] absolute block -top-full right-0 w-[2px] h-full bg-gradient-to-b from-transparent to-[#03e9f4] animate-animate2"></span>
                    <span className="hue-rotate-[270deg] absolute block bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent to-[#03e9f4] animate-animate3"></span>
                    <span className="absolute block bottom-full left-0 w-[2px] h-full bg-gradient-to-t from-transparent to-[#03e9f4] animate-animate4"></span>
                    Detail
                  </button>
                  <Button buttonText="Add to Favorite" movie={movie} />
                </div>
              </div>
            </div>
          );
        })}
        {searchMorebutton ? (
          <button className="flex flex-col items-center text-3xl text-emerald-400 cursor-default mb-10">
            See more movies
            <BsFillArrowDownCircleFill className="fill-current text-cyan-400 cursor-pointer mt-4 animate-bounce" size={45} onClick={handleMoviesSearchPage} />
          </button>
        ) : null}
      </div>
    </>
  );
};

export default SearchResults;
