import React from "react";

const ThemeBox = ({ theme }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-betwwen",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          background: `${theme === "light" ? "white" : "gray"}`,
          color: `${theme === "light" ? "black" : "white"}`,
        }}
      >
        Test Box 1
      </div>
      <div
        style={{
          width: "100px",
          height: "100px",
          background: `${theme === "light" ? "white" : "gray"}`,
          color: `${theme === "light" ? "black" : "white"}`,
        }}
      >
        Test Box 2
      </div>
      <div
        style={{
          width: "100px",
          height: "100px",
          background: `${theme === "light" ? "white" : "gray"}`,
          color: `${theme === "light" ? "black" : "white"}`,
        }}
      >
        Test Box 3
      </div>
    </div>
  );
};

export default ThemeBox;
