import React, { useState } from "react";

const ControlledForm = () => {
  const [text, setText] = useState("");

  const handlesubmit = () => {
    if (text.trim() == "") return alert("Please enter text");

    alert(text);
  };

  return (
    <div>
      <input
        type="text"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handlesubmit}>Submit</button>
    </div>
  );
};

export default ControlledForm;
