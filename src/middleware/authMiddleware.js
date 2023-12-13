const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = 'your-secret-key';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token de acceso inválido' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };
