import React, { createContext, useState } from "react";

export const RootContext = createContext();
const Provider = RootContext.Provider;

const GlobalProvider = (Children) => {
  const Wrapper = (props) => {
    const [favorite, setFavorite] = useState([]);

    const handleFavorite = (movie) => {
      setFavorite([...favorite, movie]);
    };

    return (
      <Provider value={{ handleFavorite, fav: [favorite, setFavorite] }}>
        <Children {...props} />
      </Provider>
    );
  };
  return Wrapper;
};

export default GlobalProvider;
