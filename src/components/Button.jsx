import React, { useContext } from "react";

import { HandleClikSearchContext, HandleDetailPageContext } from "../pages/Home";
import { HandleSimilarDetailpageContext } from "../pages/Detail";
import { RootContext } from "../context/context";

const Button = ({ buttonText, movie }) => {
  const handleClikSearch = useContext(HandleClikSearchContext);
  const handleDetailPageHome = useContext(HandleDetailPageContext);
  const handleSimilarDetailPage = useContext(HandleSimilarDetailpageContext);
  const handleFavorite = useContext(RootContext).handleFavorite;

  const handleSearchAndDetailButton = () => {
    if (buttonText === "Search") {
      handleClikSearch();
    } else if (buttonText === "Detail") {
      if (handleDetailPageHome?.value2 === "home") {
        handleDetailPageHome.value1();
      } else {
        handleSimilarDetailPage();
      }
    } else {
      handleFavorite(movie);
    }
  };

  return (
    <>
      <button
        className="relative inline-block py-2 px-7 text-[#03e9f4] uppercase transition duration-500 
         ease-in-out tracking-[4px] overflow-hidden hover:bg-[#03e9f4] hover:text-[#050801] hover:shadow-[0_0_5px_#03e9f4,0_0_25px_#03e9f4,0_0_50px_#03e9f4,0_0_200px_#03e9f4] hover:box-reflect"
        onClick={(e) => handleSearchAndDetailButton(e)}
      >
        <span className="hue-rotate-[90deg] absolute block top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent to-[#03e9f4] animate-animate1"></span>
        <span className="hue-rotate-[180deg] absolute block -top-full right-0 w-[2px] h-full bg-gradient-to-b from-transparent to-[#03e9f4] animate-animate2"></span>
        <span className="hue-rotate-[270deg] absolute block bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent to-[#03e9f4] animate-animate3"></span>
        <span className="absolute block bottom-full left-0 w-[2px] h-full bg-gradient-to-t from-transparent to-[#03e9f4] animate-animate4"></span>
        {buttonText}
      </button>
    </>
  );
};

export default Button;
