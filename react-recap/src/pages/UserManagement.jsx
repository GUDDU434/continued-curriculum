import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]); // List of users
  const [name, setName] = useState(""); // Input for new user
  const [email, setEmail] = useState("");
  const [editUser, setEditUser] = useState(null); // Currently edited user
  const [editValue, setEditValue] = useState({}); // Value of the edited user

  // Function to fetch users (called manually)
  const fetchUsers = () => {
    axios
      .get("https://your-firebase-db.firebaseio.com/users.json")
      .then((response) => {
        const fetchedUsers = response.data
          ? Object.entries(response.data).map(([id, user]) => ({
              id,
              ...user,
            }))
          : [];
        setUsers(fetchedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  // Function to add a new user
  const addUser = () => {
    if (name.trim() === "") return;
    if (email.trim() === "") return;

    axios
      .post("https://your-firebase-db.firebaseio.com/users.json", {
        name: name,
        email: email,
      })
      .then(() => {
        setName(""); // Clear input
        setEmail(""); // Clear input
        fetchUsers();
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  // Function to update a user
  const updateUser = (id, updatedValue) => {
    axios
      .patch(
        `https://your-firebase-db.firebaseio.com/users/${id}.json`,
        updatedValue
      )
      .then(() => fetchUsers())
      .catch((error) => console.error("Error updating user:", error));
  };

  // Function to delete a user
  const deleteUser = (id) => {
    axios
      .delete(`https://your-firebase-db.firebaseio.com/users/${id}.json`)
      .then(() => fetchUsers())
      .catch((error) => console.error("Error deleting user:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <h1>User Management Application</h1>

      {/* Add User Input */}
      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={addUser}>Add</button>
      </div>

      {/* Display User List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <span>
              {user.name} - {user.email}
            </span>

            {/* Edit & Delete Buttons */}
            <div>
              <button
                onClick={() => {
                  setEditUser(user.id);
                  setEditValue({ name: user.name, email: user.email });
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit User Input */}
      {editUser && (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button
            onClick={() => {
              updateUser(editUser, editValue);
              setEditUser(null); // Clear edit state
              setEditValue({}); // Clear edit value
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditUser(null); // Cancel editing
              setEditValue({}); // Clear edit value
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
