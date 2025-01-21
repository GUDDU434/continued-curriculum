import { useState } from "react";

export const useLocalStorage = () => {
  const [data, setData] = useState(null);
  const retrieveData = (key) => {
    const localstorageData = localStorage.getItem(key);
    setData(JSON.parse(localstorageData));
  };

  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    return;
  };

  return { data, retrieveData, saveData };
};
