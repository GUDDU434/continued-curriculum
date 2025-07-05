import React, { useRef } from "react";

const UnControlledForm = () => {
  const textRef = useRef("");

  const handlesubmit = () => {
    if (textRef.current.value.trim() == "") return alert("Please enter text");

    alert(textRef.current.value);
  };

  return (
    <div>
      <input
        type="text"
        required
        ref={textRef}
        onChange={(e) => (textRef.current = e.target.value)}
      />
      <button onClick={handlesubmit}>Submit</button>
    </div>
  );
};

export default UnControlledForm;
