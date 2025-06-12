const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// send single user details
app.get("/users/get", (req, res) => {
  let user = { id: 1, name: "John Doe", email: "john@example.com" };

  res.status(200).json({
    message: "User list fached successfully",
    user,
  });
});

// Send User list
app.get("/users/list", (req, res) => {
  let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
    { id: 3, name: "Bob Smith", email: "bob@example.com" },
  ];

  res.status(200).json({ message: "User list fached successfully", users });
});

// Handle All Undefined Routes
app.use((req, res, next) => {
  res.status(404).send({ error: "404 Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
