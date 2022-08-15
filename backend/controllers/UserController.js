const User = require('../models/User'); // Importa o model do usuário

const bcrypt = require('bcryptjs'); // Importa o bcrypt

const jwt = require('jsonwebtoken'); // Importa o json web token

const jwtSecret = process.env.JWT_SECRET; // Importa o secret do .env

// Gerando user token

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: '7d' });
  // jwt sign gera o token com o id do usuário e jwt secret, e tambem o prazo para expirar
};

// Register user and sign in

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Checar se usuário já está cadastrado
  const user = await User.findOne({ email }); // Irá checar pelo e-mail

  if (user) {
    res.status(422).json({
      errors: ['E-mail já registrado. Por favor utilize outro e-mail.'],
    });
  } // Se o usuário existir irá retornar o erro

  // Gerar hash de senha (SEGURANÇA)
  const salt = await bcrypt.genSalt(); // Polui a string da senha
  const passwordHash = await bcrypt.hash(password, salt); // Gera uma senha aleatória para o sistema

  // Criar usuário
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  }); // Cria o usuário baseado nas variáveis recebidas e com a senha gerada

  if (!newUser) {
    res.status(422).json({
      errors: ['Houve um erro, por favor tente novamente mais tarde.'],
    });
    return;
  } // Se houver um erro retorna o erro acima

  res.status(201).json({
    _id: newUser.id,
    token: generateToken(newUser._id),
  }); // Se o usuário foi criado com sucesso, retorna o token
};

module.exports = {
  register,
};
