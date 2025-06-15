const Note = require("../models/note.model");
const { SendSuccessResponse, CalculateNextUrl } = require("../utils/commonfun");

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content, tags, isPinned, isArchived } = req.body;
    const userId = req.user._id; // assuming user is authenticated via middleware

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const note = await Note.create({
      userId,
      title,
      content,
      tags,
      isPinned,
      isArchived,
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all notes for a user (with optional filters)
exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const { archived, pinned } = req.query;

    const filter = {
      userId,
      isDeleted: false,
    };

    if (archived !== undefined) filter.isArchived = archived === "true";
    if (pinned !== undefined) filter.isPinned = pinned === "true";

    const notes = await Note.find(filter).sort({ updatedAt: -1 });

    const totalNotes = await Note.countDocuments(filter);

    const nextUrl = CalculateNextUrl(
      req,
      req.query.page,
      req.query.limit,
      totalNotes
    );

    return SendSuccessResponse(res, 200, "Notes fetched successfully", {
      notes,
      total: totalNotes,
      nextUrl,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const note = await Note.findOne({ _id: id, userId, isDeleted: false });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return SendSuccessResponse(res, 200, "Notes fetched successfully", {
      note,
    });
  } catch (error) {
    console.error("Error getting note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { title, content, tags, isPinned, isArchived } = req.body;

    const note = await Note.findOne({ _id: id, userId, isDeleted: false });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;
    if (isArchived !== undefined) note.isArchived = isArchived;

    await note.save();

    return SendSuccessResponse(res, 200, "Note updated successfully", note);
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Soft delete a note
exports.deleteNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const note = await Note.findOne({ _id: id, userId, isDeleted: false });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isDeleted = true;
    await note.save();

    return SendSuccessResponse(res, 204, "Note deleted successfully", {});
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
