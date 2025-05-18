const express = require("express");
const cors = require("cors");
const bookRouter = require("./controllers/book.controller");

const {
  RegisterUser,
  LoginUser,
  LogoutUser,
  RefreshToken,
  GetUser,
  UpdateUserDetails,
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

// Auth Routes
app.post("/api/auth/register", RegisterUser);
app.post("/api/auth/login", LoginUser);
app.post("/api/auth/refresh", RefreshToken);
app.get("/api/auth/logout", authenticate, LogoutUser);
app.get("/api/auth/me", authenticate, GetUser);
app.put("/api/auth/user", authenticate, UpdateUserDetails);

// Tasks Routes
app.get("/api/books", authenticate, bookRouter.GetAllTasks);

app.post("/api/mybooks/:bookId", authenticate, bookRouter.CreateTask);
app.get("/api/mybooks", authenticate, bookRouter.GetTaskById);
app.put(
  "/api/mybooks/:bookId/status",
  authenticate,
  bookRouter.UpdateRetingOrStatus
);
app.put(
  "/api/mybooks/:bookId/rating",
  authenticate,
  bookRouter.UpdateRetingOrStatus
);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
