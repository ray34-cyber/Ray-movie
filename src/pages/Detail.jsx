import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsYoutube } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export const HandleSimilarDetailpageContext = React.createContext();

const Detail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [trailers, setTrailers] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [similarPage, setSimilarPage] = useState(1);
  const [moreSimilar, setMoreSimilar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getMovieDetail = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/movie/${location.state.id}`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      })
      .then((response) => {
        setMovieDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMovieDetail();
    //eslint-disable-next-line
  }, [location.state.id]);

  const getTrailer = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/movie/${location.state.id}/videos`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      })
      .then((response) => {
        setTrailers([...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTrailer();
    //eslint-disable-next-line
  }, [location.state.id]);

  const handleShowTrailer = () => {
    setShowTrailer(true);
  };

  const handleNotShowTrailer = () => {
    setShowTrailer(false);
  };

  const getSimilarMovie = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/movie/${location.state.id}/similar`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          page: similarPage,
        },
      })
      .then((response) => {
        if (similarPage <= response.data.total_pages) {
          if (similarPage === 1) {
            setSimilarMovie([...response.data.results]);
          } else {
            setSimilarMovie([...similarMovie, ...response.data.results]);
            if (similarPage === response.data.total_pages) {
              setMoreSimilar(false);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSimilarMovie();

    //eslint-disable-next-line
  }, [similarPage, location.state.id]);

  const handleSimilarPage = () => {
    setSimilarPage(similarPage + 1);
  };

  const handleSimilarDetailpage = (id) => {
    navigate(`/detail/${id}`, {
      state: {
        id,
      },
    });
    setSimilarMovie([]);
    setSimilarPage(1);
  };

  return (
    <>
      <Navbar />
      <div
        className="w-full h-auto bg-cover py-10 md:h-[600px] relative"
        style={movieDetail.backdrop_path ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${process.env.REACT_APP_IMG_URL}${movieDetail.backdrop_path})` } : null}
      >
        <div className="container mx-auto flex flex-col items-center md:flex-row">
          <div className="bg-slate-500 rounded-lg">
            <img className="w-[300px] rounded-t-lg block" src={movieDetail.poster_path ? `${process.env.REACT_APP_IMG_URL}${movieDetail.poster_path}` : null} alt={movieDetail.title} />
            <button
              className="relative w-[300px] flex items-center rounded-b-lg py-2 px-7 text-[#03e9f4] uppercase transition duration-500 
         ease-in-out tracking-[4px] overflow-hidden hover:bg-[#03e9f4] hover:text-[#050801] hover:shadow-[0_0_5px_#03e9f4,0_0_25px_#03e9f4,0_0_50px_#03e9f4,0_0_200px_#03e9f4] hover:box-reflect"
              onClick={handleShowTrailer}
            >
              <BsYoutube size={45} className="mr-7" />
              <span className="hue-rotate-[90deg] absolute block top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent to-[#03e9f4] animate-animate1"></span>
              <span className="hue-rotate-[180deg] absolute block -top-full right-0 w-[2px] h-full bg-gradient-to-b from-transparent to-[#03e9f4] animate-animate2"></span>
              <span className="hue-rotate-[270deg] absolute block bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent to-[#03e9f4] animate-animate3"></span>
              <span className="absolute block bottom-full left-0 w-[2px] h-full bg-gradient-to-t from-transparent to-[#03e9f4] animate-animate4"></span>
              Watch trailer
            </button>
          </div>
          <div className="ml-24 mt-4 flex flex-col justify-evenly items-start h-[40vh] md:ml-40 md:mt-0">
            <h1 className="text-white text-4xl">{movieDetail.title}</h1>
            <h2 className="text-white text-2xl">
              {movieDetail.genres?.map((genre) => {
                return (
                  <span className="text-white" key={genre.id}>
                    {genre.name}&nbsp;
                  </span>
                );
              })}
            </h2>
            <h3 className="text-white text-2xl">
              <span className="bg-stone-400 rounded-lg pl-3">{movieDetail.vote_average?.toFixed(2)}&nbsp;&nbsp;%&nbsp;&nbsp;</span>
              &nbsp;&nbsp;&nbsp;&nbsp;<span>Popularity</span>
            </h3>

            <h3 className="text-white text-2xl">
              Overview
              <p className="text-white indent-10 mt-4 text-lg">{movieDetail.overview}</p>
            </h3>
          </div>
        </div>
        {showTrailer ? (
          <div className="absolute w-full flex flex-col justify-center items-center top-16 bg-white">
            <button className="flex items-center mb-8 text-2xl cursor-default">
              <AiFillCloseCircle className="fill-current text-teal-400 mr-2 cursor-pointer" size={45} onClick={handleNotShowTrailer} /> Close Trailer
            </button>
            <div className="w-full flex overflow-x-auto">
              {trailers.map((trailer) => {
                return (
                  <div key={trailer.id} className="mx-4">
                    <iframe
                      className="w-[400px] h-[250px] md:w-[560px] md:h-[315px]"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      <h1 className="text-center my-10 text-4xl">Similar Movie</h1>
      <div className="flex w-full overflow-x-auto my-2 px-8">
        {similarMovie?.map((movie) => {
          return (
            <HandleSimilarDetailpageContext.Provider key={movie.id} value={() => handleSimilarDetailpage(movie.id)}>
              <Card movie={movie} />;
            </HandleSimilarDetailpageContext.Provider>
          );
        })}
        {moreSimilar ? (
          <button className="ml-2 cursor-default">
            <BsArrowRightCircleFill className="fill-current text-teal-400 cursor-pointer animate-animateArrowRight" size={45} onClick={handleSimilarPage} />
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Detail;
