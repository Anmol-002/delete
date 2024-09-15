// DarkModeToggle.js
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // You can install react-icons for these icons

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button className="toggle-button" onClick={toggleDarkMode}>
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeToggle;
