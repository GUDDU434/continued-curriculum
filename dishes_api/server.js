const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add New dish to db.json
app.post("/dishes", (req, res) => {
  //Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let dishes = data?.dishes || []; // Get only dished array
  dishes.push(req.body); // Push new dish to the dishes array
  fs.writeFileSync("./db.json", JSON.stringify(dishes)); // update the dishes list

  //Send the success response
  res.status(200).json({ message: "Dish added successfully" });
});

// Get Dishes list
app.get("/dishes", (req, res) => {
  //Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let dishes = data?.dishes || []; // Get only dished array

  //Send the success response
  res.status(200).json({ message: "Dish fached successfully", dishes });
});

// Get Dishes by id
app.get("/dishes/:id", (req, res) => {
  //Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let dishes = data?.dishes || []; // Get only dished array

  // Fiter the dish by id
  let dish = dishes.filter((dish) => dish.id == req.params.id);

  //Send the success response
  res.status(200).json({ message: "Dish details fached successfully", dish });
});

// Update Dishes by id
app.put("/dishes/:id", (req, res) => {
  //Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let dishes = data?.dishes || []; // Get only dished array

  // Fiter the dish by id
  let dish = dishes.map((dish) => {
    if (dish.id == req.params.id) {
      return { ...dish, ...req.body };
    } else {
      return dish;
    }
  });

  //Send the success response
  res.status(200).json({ message: "Dish Updated successfully", dish });
});

// Delete Dishes by id
app.delete("/dishes/:id", (req, res) => {
  //Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let dishes = data?.dishes || []; // Get only dished array

  // Fiter the dish by id
  let dish = dishes.filter((dish) => dish.id != req.params.id);

  fs.writeFileSync("./db.json", JSON.stringify(dish)); // update the dishes list

  //Send the success response
  res.status(200).json({ message: "Dish deleted successfully" });
});

// Handle All Undefined Routes
app.use((req, res, next) => {
  res.status(404).send({ error: "404 Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
