const Book = require("../models/book.model.js");

// Create Book
module.exports.CreateBook = async (req, res) => {
  try {
    const newBook = new Book({ ...req.body, user: req?.user?.userId });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Books
module.exports.GetAllBooks = async (req, res) => {
  try {
    const tasks = await Book.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Single Book
module.exports.GetBookById = async (req, res) => {
  try {
    const task = await Book.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Book
module.exports.UpdateBook = async (req, res) => {
  try {
    let task = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Book
module.exports.DeleteBook = async (req, res) => {
  try {
    const task = await Book.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: "Book not found" });
    }
    await task.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
