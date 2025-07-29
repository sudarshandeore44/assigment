"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.createNote = exports.getNotes = void 0;
const Note_1 = __importDefault(require("../models/Note"));
// ✅ Get all notes for a logged-in user
const getNotes = async (req, res) => {
    try {
        const notes = await Note_1.default.find({ user: req.user._id });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch notes' });
    }
};
exports.getNotes = getNotes;
// ✅ Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }
        const note = await Note_1.default.create({
            user: req.user._id,
            title,
            content,
        });
        res.status(201).json(note);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create note' });
    }
};
exports.createNote = createNote;
// ✅ Delete a note by ID
const deleteNote = async (req, res) => {
    try {
        const note = await Note_1.default.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found or unauthorized' });
        }
        await note.deleteOne();
        res.json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete note' });
    }
};
exports.deleteNote = deleteNote;
