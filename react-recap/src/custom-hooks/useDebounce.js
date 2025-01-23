import { useRef } from "react";

export const useDebounce = () => {
  let { cuurrent: id } = useRef();

  const handleDebounce = (func) => {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      func();
    }, 2000);
  };
  return handleDebounce;
};
