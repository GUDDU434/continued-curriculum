import React from "react";
import { useWindowSize } from "../custom-hooks/useWindowSize";

const WindowSize = () => {
  const size = useWindowSize();
  return (
    <div>
      <h1>Window Size</h1>
      <p>Width: {size[0]}</p>
      <p>Height: {size[1]}</p>
    </div>
  );
};

export default WindowSize;
