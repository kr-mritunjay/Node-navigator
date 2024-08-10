// src/App.js
import { React, useState, useEffect } from "react";
import "./App.css";
import GraphComponent from "./components/Graph";
import "../src/style/Graphs.css";

// import data from "./data/data";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);
  return (
    <div>
      <h1>Node Navigator</h1>
      <button
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          alignItems: "center",
          gap: "30px",
          background: darkMode ? "grey" : "black",
        }}
      ></button>

      <GraphComponent />
    </div>
  );
};

export default App;
