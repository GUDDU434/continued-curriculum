import React, { useRef } from "react";

const FormWithRef = () => {
  const ref = useRef("");
  return (
    <div>
      <input type="text" ref={ref} />
      <button
        onClick={() => {
          alert(ref.current.value);
          ref.current.value = "";
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default FormWithRef;
