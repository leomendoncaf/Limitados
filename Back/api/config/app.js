const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const database = require('./config/database');
const routes = require('./config/routes');
require('./config/passport')(passport);

// Criando a instância do aplicativo
const app = express();

// Configurando os middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'segredo',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
database.connect();

// Definindo as rotas
app.use('/api', routes);

// Exportando a instância do aplicativo
module.exports = app;
