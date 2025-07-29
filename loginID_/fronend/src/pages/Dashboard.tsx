import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { notesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Note } from '../components/Note';
const Dashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      if (token) {
        const res = await axios.get<Note[]>('/api/notes');
        setNotes(res.data);
      }
    };
    fetchNotes();
  }, [token]);

  const handleAddNote = async () => {
    if (token && newNote.trim()) {
      const res = await notesAPI.createNote(token, newNote);
      setNotes([...notes, res.data]);
      setNewNote('');
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (token) {
      await notesAPI.deleteNote(token, id);
      setNotes(notes.filter((note) => note._id !== id));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Welcome, {user?.name}</Typography>
        <Button onClick={logout} sx={{ mt: 2 }}>Logout</Button>
        <Box sx={{ mt: 4 }}>
          <TextField fullWidth label="New Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddNote}>Add Note</Button>
        </Box>
        <List sx={{ mt: 3 }}>
          {notes.map((note) => (
            <ListItem key={note._id} secondaryAction={
              <IconButton edge="end" onClick={() => handleDeleteNote(note._id)}>
                <DeleteIcon />
              </IconButton>
            }>
              {note.content}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Dashboard;
