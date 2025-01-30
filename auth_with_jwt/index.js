const express = require("express");
const cors = require("cors");
const {
  RegisterUser,
  LoginUser,
  LogoutUser,
} = require("./controllers/user.controller");
const { authenticate } = require("./middleware/auth_middleware");
require("dotenv").config();
require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/start", (req, res) => {
  res.send("welcome to the auth server");
});

app.post("/registration", RegisterUser);
app.post("/login", LoginUser);
app.get("/logout", authenticate, LogoutUser);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
