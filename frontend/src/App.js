//import react, the relevent components and css
import React from "react";
import Display from "./Display.js";
import Heading from "./Heading.js";
import "./display.css";
import Footer from './Footer.js';

//use a functional component to render everything
function App() {
  return (
    <div id="app">
      <Heading />
      <Display />
      <Footer/>
    </div>
  );
}

export default App;
