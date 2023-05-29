const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user'); // importando a classe User

class Authentication {
  static async authenticate(email, password) {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Senha incorreta.');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
  }

  static async authorize(request, response, next) {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return response.status(401).send({ error: 'Token não fornecido.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return response.status(401).send({ error: 'Usuário não encontrado.' });
      }

      request.user = user;
      next();
    } catch (error) {
      return response.status(401).send({ error: 'Token inválido.' });
    }
  }
}

module.exports = Authentication;
