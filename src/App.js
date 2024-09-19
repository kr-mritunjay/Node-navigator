// src/App.js
import { React, useState, useEffect } from "react";
import "./App.css";
import GraphComponent from "./components/Graph";
import "../src/style/Graphs.css";
import { FaSun, FaMoon } from "react-icons/fa";

// import data from "./data/data";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);
  return (
    <div>
      <h1>Node Navigator</h1>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <GraphComponent />
    </div>
  );
};

export default App;
