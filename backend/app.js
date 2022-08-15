require('dotenv').config(); // Config do .env

const express = require('express'); //Framework de backend
const path = require('path'); // Trata os paths do app
const cors = require('cors'); // Para acessar o projeto no front end

const port = process.env.PORT; // Define a porta que o servidor irá ser executado

const app = express();

// Config para receber os dados em JSON e form data para enviar imagens
app.use(express.json()); // Middleware do express para habilitar JSON
app.use(express.urlencoded({ extended: false })); // Middleware do express para lidar com url, com extended false para aceitar o form data

// Resolver CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000/' })); // Permite que recursos restritos em uma página da web sejam recuperados por outro dominio

// Pasta de Uploads(imagens)
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // '/uploads' nome da pasta | express.static - arquivos estaticos | path.join junta o nome do caminho com o nome da pasta

// Conexão com DB
require('./config/db.js');

// Rotas
const router = require('./routes/Router.js');
app.use(router);

app.listen(port, () => {
  console.log('App rodando na porta: ' + port);
});
