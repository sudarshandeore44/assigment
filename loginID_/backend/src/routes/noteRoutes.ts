import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createNote, deleteNote, getNotes } from '../controllers/noteController';

const router = express.Router();

// ✅ Get all notes for authenticated user
router.get('/', protect, getNotes);

// ✅ Create a new note
router.post('/', protect, createNote);

// ✅ Delete a note by ID
router.delete('/:id', protect, deleteNote);

export default router;
