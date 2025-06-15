const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");
const { authenticate } = require("../middleware/auth_middleware");

router.use(authenticate); // Protect all routes

router.post("/", noteController.createNote);
router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
