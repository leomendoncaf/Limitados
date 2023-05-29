const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Função para gerar um novo token JWT
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

// Função para verificar se um token JWT é válido
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
