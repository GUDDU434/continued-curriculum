const MyBooks = require("../models/myBook.model");
module.exports.UpdateRetingOrStatus = async (req, res) => {
  try {
    const user = await MyBooks.findByIdAndUpdate(req.user.userId, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: "Books not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.AddToMyBook = async (req, res) => {
  try {
    const newBook = new MyBooks({
      rating: 1,
      userId: req?.user?.userId,
      bookId: req?.params?.id,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.GetAllMyBooks = async (req, res) => {
  try {
    const myBooks = await Book.find({ userId: req.user.userId })

    res.status(200).json(myBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};