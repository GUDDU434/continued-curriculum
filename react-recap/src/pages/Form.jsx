import React, { useState } from "react";

function Form() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() === "") {
      setError("username is required");
    } else {
      setError("");
      alert(userName);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
