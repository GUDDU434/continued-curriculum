const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//////////////////////////////// 01. Setting Up a Basic Express Server ////////////////////////////////////////

// Send HTML Response
app.get("/home", (req, res) => {
  res.status(200).send(`<h1>Welcome to Home Page</h1>`);
});

// Send Json Response
app.get("/aboutus", (req, res) => {
  res.status(200).json({ message: "Welcome to About Us" });
});

// Send contact response in a json object
app.get("/contactus", (req, res) => {
  res.status(200).json({
    name: "guddu ali",
    mobile: 7549981895,
    email: "guddu@gmail.com",
    address: "mumbai",
  });
});

// Handle All Undefined Routes
app.use((req, res, next) => {
  res.status(404).send("Not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
