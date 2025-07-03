import React, { useEffect, useState } from "react";
import ThemeBox from "./ThemeBox";

const ThemeApp = () => {
  const [theme, setTheme] = useState("light");

  function onToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);

  return (
    <div>
      <ThemeBox theme={theme} />
      <button onClick={onToggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemeApp;
