import React, { useState } from "react";
import { useLocalStorage } from "../custom-hooks/useLocalStorage";

const LocalStorageHooks = () => {
  const [text, setText] = useState("");
  const { data, retrieveData, saveData } = useLocalStorage();

  return (
    <div>
      <h1>Local Storage</h1>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={() => saveData("name", text)}>Save</button>
      <button onClick={() => retrieveData("name")}>Retrieve</button>
      <h1>{data}</h1>
    </div>
  );
};

export default LocalStorageHooks;
