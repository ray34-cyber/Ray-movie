import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import Favorite from "./pages/Favorite";
import Detail from "./pages/Detail";
import GlobalProvider from "./context/context";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search/:id" element={<SearchResults />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </>
  );
}

export default GlobalProvider(App);
