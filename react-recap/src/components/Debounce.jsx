import React from "react";
import { useDebounce } from "../custom-hooks/useDebounce";

const Debounce = () => {
  const handleDebounce = useDebounce();
  const handleApiCall = () => {
    console.log("Api Called...");
  };

  return (
    <div>
      <h1>Debounce</h1>
      <button onClick={() => handleDebounce(handleApiCall)}>
        Make Api Call
      </button>
    </div>
  );
};

export default Debounce;
