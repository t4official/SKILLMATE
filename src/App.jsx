import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";


import "./App.css";
import "./UIPolish.css";



import CareerAssistant from "./components/CareerAssistant";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Result from "./pages/Result";
import Careers from "./pages/Careers";
import CareerDetails from "./CareerDetails";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>

      {/* AI CAREER ASSISTANT */}
      <CareerAssistant />

      {/* DARK MODE TOGGLE */}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* ROUTES */}
      <BrowserRouter>
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* ASSESSMENT */}
          <Route
            path="/assessment"
            element={<Assessment />}
          />

          {/* RESULT */}
          <Route
            path="/result"
            element={<Result />}
          />

          {/* ALL CAREERS */}
          <Route
            path="/careers"
            element={<Careers />}
          />

          {/* CAREER DETAILS */}
          <Route
            path="/career/:careerId"
            element={<CareerDetails />}
          />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;