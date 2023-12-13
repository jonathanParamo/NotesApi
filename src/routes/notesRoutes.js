const express = require('express');
const notesController = require('../controllers/notesController');

const router = express.Router();

router.get('/', notesController.getNotes);
router.post('/', notesController.addNote);
router.put('/:id', notesController.editNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;
