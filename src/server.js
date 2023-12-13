require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const authController = require('./controllers/authController');
const notesController = require('./controllers/notesController');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/signup', authController.signup);
app.post('/signin', authController.signin);

app.use((req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token de acceso no proporcionado' });

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token de acceso inválido' });
    req.user = decoded;
    next();
  });
});

app.use(authMiddleware.authenticateToken);

app.get('/notes', notesController.getNotes);
app.post('/notes', notesController.addNote);
app.put('/notes/:id', notesController.editNote);
app.delete('/notes/:id', notesController.deleteNote);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
