import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Basket from "./Pages/Basket";
import Favorites from "./Pages/Favorites"
import Navigation from "./Components/Navigation/Navigation";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/favorites" exact element={<Favorites />} />
        <Route path="/basket" exact element={<Basket />} />
      </Routes>
      <Footer/>
    </Fragment>
  );
}

export default App;
