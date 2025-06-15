const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add New book to db.json
app.post("/books", (req, res) => {
  //Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

  let books = data || []; // Get only booked array
  let newId = books[books?.length - 1]?.id || 0;

  books.push({ ...req.body, id: newId + 1 }); // Push new book to the books array

  console.log({ ...req.body, id: newId + 1 }, newId);

  fs.writeFileSync("./db.json", JSON.stringify(books)); // update the books list

  //Send the success response
  res.status(200).json({ message: "book added successfully" });
});

// Get books list
app.get("/books", (req, res) => {
  //Get all db data

  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let books = data || []; // Get only booked array

  //Send the success response
  res.status(200).json({ message: "book fached successfully", books });
});

// Get books list
app.get("/books/search", (req, res) => {
  const { author } = req.query;

  if (!author || !author.trim())
    return res.status(400).json({ message: "Author is required" });

  // Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let books = data || []; // Get only booked array

  // filter books by author name it should also do partial match search
  books = books.filter((book) =>
    book.author.toLowerCase().includes(author.toLowerCase())
  );

  //Send the success response
  res.status(200).json({ message: "book fached successfully", books });
});

// Get books by id
app.get("/books/:id", (req, res) => {
  //Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let books = data || []; // Get only booked array

  // Fiter the book by id
  let book = books.filter((book) => book.id == req.params.id);

  //Send the success response
  res.status(200).json({ message: "book details fached successfully", book });
});

// Update books by id
app.put("/books/:id", (req, res) => {
  //Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let books = data || []; // Get only booked array

  // Fiter the book by id
  let book = books.map((book) => {
    if (book.id == req.params.id) {
      return { ...book, ...req.body };
    } else {
      return book;
    }
  });

  //Send the success response
  res.status(200).json({ message: "book Updated successfully", book });
});

// Delete books by id
app.delete("/books/:id", (req, res) => {
  //Get all db data
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let books = data || []; // Get only booked array

  // Fiter the book by id
  let book = books.filter((book) => book.id != req.params.id);

  fs.writeFileSync("./db.json", JSON.stringify(book)); // update the books list

  //Send the success response
  res.status(204).json({ message: "book deleted successfully" });
});

// Handle All Undefined Routes
app.use((req, res, next) => {
  res.status(404).send({ error: "404 Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
