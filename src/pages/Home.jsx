import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import Swal from "sweetalert2";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const HandleClikSearchContext = React.createContext();
export const HandleDetailPageContext = React.createContext();

const Home = () => {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [input, setInput] = useState("");
  const [pageNowPlaying, setPageNowPlaying] = useState(1);
  const [pagePopular, setPagePopular] = useState(1);
  const [moreNowPlaying, setMoreNowPlaying] = useState(true);
  const [morePopular, setMorePopular] = useState(true);
  const [popularButton, setPopularButton] = useState(true);
  const [homeDetailButton] = useState("home");
  const navigate = useNavigate();

  const getMovieFromNowPlaying = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/movie/now_playing`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          page: pageNowPlaying,
        },
      })
      .then((response) => {
        if (pageNowPlaying <= response.data.total_pages) {
          if (pageNowPlaying === 1) {
            setMoviesNowPlaying([...response.data.results]);
          } else {
            setMoviesNowPlaying([...moviesNowPlaying, ...response.data.results]);
            if (pageNowPlaying === response.data.total_pages) {
              setMoreNowPlaying(false);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMovieFromNowPlaying();
    //eslint-disable-next-line
  }, [pageNowPlaying]);

  const handlePageNowPlaying = () => {
    setPageNowPlaying(pageNowPlaying + 1);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleClikSearch = () => {
    if (input === "") {
      Swal.fire({
        icon: "error",
        title: "Please Enter your search keyword",
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      navigate(`/search/${input}`, {
        state: {
          input,
        },
      });
    }
  };

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") {
        Swal.fire({
          icon: "error",
          title: "Please Enter your search keyword",
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        navigate(`/search/${input}`, {
          state: {
            input,
          },
        });
      }
    }
  };

  const getMovieFromPopular = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          page: pagePopular,
        },
      })
      .then((response) => {
        if (pagePopular <= response.data.total_pages) {
          if (pagePopular === 1) {
            setMoviesPopular([...response.data.results]);
          } else {
            setMoviesPopular([...moviesPopular, ...response.data.results]);
            if (pagePopular === response.data.total_pages) {
              setMorePopular(false);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMovieFromPopular();
    //eslint-disable-next-line
  }, [pagePopular]);

  const handlePopularButton = () => {
    setPopularButton(false);
  };

  const handlePagePopular = () => {
    setPagePopular(pagePopular + 1);
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
      <HandleClikSearchContext.Provider value={handleClikSearch}>
        <Welcome handleInput={handleInput} handleEnterSearch={handleEnterSearch} input={input} />
      </HandleClikSearchContext.Provider>
      <h1 className="text-center text-4xl mt-4 text-cyan-400">Now playing</h1>
      <div className="flex flex-row overflow-x-scroll py-3 w-full my-2 px-8">
        {moviesNowPlaying.map((movie) => (
          <HandleDetailPageContext.Provider key={movie.id} value={{ value1: () => handleDetailPage(movie.id), value2: homeDetailButton }}>
            <Card movie={movie} />
          </HandleDetailPageContext.Provider>
        ))}
        {moreNowPlaying ? (
          <button className="ml-2 cursor-default">
            <BsArrowRightCircleFill className="fill-current text-teal-400 cursor-pointer animate-animateArrowRight" size={45} onClick={handlePageNowPlaying} />
          </button>
        ) : null}
      </div>

      {popularButton ? (
        <div className="flex flex-row justify-center items-center overflow-x-auto py-3 w-full my-2 px-8">
          <button className="flex flex-col items-center text-3xl text-emerald-400 cursor-default">
            See popular movies
            <BsFillArrowDownCircleFill className="fill-current text-cyan-400 cursor-pointer mt-4 animate-bounce" size={45} onClick={handlePopularButton} />
          </button>
        </div>
      ) : null}
      {popularButton ? null : (
        <>
          <h1 className="block text-center text-4xl mt-4 text-teal-400">Popular Movie</h1>
          <div className="flex flex-row overflow-x-scroll py-3 w-full my-2 px-8 ">
            {moviesPopular.map((movie) => {
              return (
                <HandleDetailPageContext.Provider key={movie.id} value={{ value1: () => handleDetailPage(movie.id), value2: homeDetailButton }}>
                  <Card movie={movie} />
                </HandleDetailPageContext.Provider>
              );
            })}
            {morePopular ? (
              <button className="ml-2 cursor-default">
                <BsArrowRightCircleFill className="fill-current text-teal-400 cursor-pointer animate-animateArrowRight" size={45} onClick={handlePagePopular} />
              </button>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
