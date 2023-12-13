const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userNotes = await Note.find({ userId });
    res.json(userNotes);
  } catch (error) {
    console.error('Error obteniendo notes:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const addNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, content } = req.body;
    const newNote = new Note({ userId, title, content });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    console.error('Error agregando note:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const editNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });
    res.json(updatedNote);
  } catch (error) {
    console.error('Error editando note:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndRemove(noteId);
    res.json({ message: 'Note eliminada con éxito', note: deletedNote });
  } catch (error) {
    console.error('Error eliminando note:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getNotes, addNote, editNote, deleteNote };
