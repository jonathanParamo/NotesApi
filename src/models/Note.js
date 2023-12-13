const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  content: String,
});

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;
