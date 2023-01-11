import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleButtonNav = () => {
    const spans = document.querySelectorAll("span");
    for (let i = 0; i < spans.length; i++) {
      if (spans[i] === spans[0]) {
        spans[i].classList.toggle("rotate-45");
      } else if (spans[i] === spans[1]) {
        spans[i].classList.toggle("scale-0");
      } else {
        spans[i].classList.toggle("-rotate-45");
      }
    }

    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.toggle("hidden");
  };

  return (
    <>
      <nav className="w-full container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-pacifico text-purple-600 hover:text-purple-700">
          <Link to="/">Ray's Cinema</Link>
        </h1>

        <div className="relative lg:flex lg:items-center lg:w-1/4">
          <div className="lg:hidden">
            <input type="checkbox" className="absolute cursor-pointer z-[1] w-[38px] h-[30px] top-[5px] -right-1 opacity-0" id="button" onClick={handleButtonNav} />
            <span className="w-[30px] h-[2px] bg-black block my-2 translate-x-[-1px] translate-y-[-1px] origin-top-left transition duration-300 ease-in-out"></span>
            <span className="w-[30px] h-[2px] bg-black block my-2 translate-x-[-1px] transition duration-300 ease-in-out"></span>
            <span className="w-[30px] h-[2px] bg-black block my-2 translate-x-[-1px] translate-y-0 origin-bottom-left transition duration-300 ease-in-out"></span>
          </div>

          <div className="hidden w-[180px] bg-white shadow-gray-300 shadow-2xl rounded-2xl absolute z-[1] top-12 right-7 p-3 lg:static lg:block lg:w-3/4 lg:bg-transparent lg:shadow-transparent lg:shadow-none lg:rounded-none" id="nav-menu">
            <ul className="lg:flex lg:justify-around">
              <li className="text-center text-3xl py-4 text-purple-500 hover:text-purple-700 lg:py-2">
                <Link to="/">Home</Link>
              </li>
              <li className="text-center text-3xl py-4 text-purple-500 hover:text-purple-700 lg:py-2">
                <Link to="/favorite">Favorite</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
