import React, { useState } from "react";

const DynamicallyAddInputField = () => {
  const [emails, setEmails] = useState([{ email: "", id: 1 }]);
  return (
    <div>
      {emails.map((email) => {
        return (
          <div key={email.id}>
            <input
              type="email"
              value={email.email}
              onChange={(e) => {
                email.email = e.target.value;
                setEmails([...emails]);
              }}
            />
          </div>
        );
      })}

      <button
        onClick={() =>
          setEmails([...emails, { email: "", id: emails.length + 1 }])
        }
      >
        Add More
      </button>

      {emails.map((email) => {
        return <div key={email.id}>{email.email}</div>;
      })}
    </div>
  );
};

export default DynamicallyAddInputField;
