const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    console.log({
      email, password,
      body: req.body
    })

    // Verifica se o usuário existe no banco de dados
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    }

    // Verifica se a senha informada é válida
    const passwordMatch = bcrypt.compareSync(password, user.password);
    console.log({ password, user: user.password })
    console.log(passwordMatch)
    if (!passwordMatch) {
      return res.status(401).send({ error: 'Senha inválida' });
    }

    // Gera o token de autenticação
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).send({ token });
  }

  async register(req, res) {
    const { name, email, password } = req.body;

    // Verifica se o usuário já está cadastrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ error: 'Usuário já cadastrado' });
    }

    // Cria o usuário no banco de dados
    // TODO: remover esse hash. User model ja esta gerando o hash
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(bcrypt.compareSync(password, hashedPassword))
    const user = new User({
      name,
      email,
      password: password,
    });
    await user.save();

    return res.status(201).send({ message: 'Usuário criado com sucesso' });
  }
}

module.exports = AuthController;
