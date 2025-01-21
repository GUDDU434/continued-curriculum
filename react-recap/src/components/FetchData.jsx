import React from "react";
import { useFetch } from "../custom-hooks/useFetch";

const FetchData = () => {
  const data = useFetch("https://jsonplaceholder.typicode.com/todos/1");

  console.log(data);

  return <div>{data && <h1>Data Fetched....</h1>}</div>;
};

export default FetchData;
