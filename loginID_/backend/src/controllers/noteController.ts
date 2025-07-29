import { Response } from 'express';
import Note from '../models/Note';
import { AuthRequest } from '../types/express';

// ✅ Get all notes for a logged-in user
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// ✅ Create a new note
export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// ✅ Delete a note by ID
export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
};
