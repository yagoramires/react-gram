const User = require('../models/User'); // Importa o model do usuário

const bcrypt = require('bcryptjs'); // Importa o bcrypt

const jwt = require('jsonwebtoken'); // Importa o json web token
const mongoose = require('mongoose');

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
  }); // Se o usuário foi criado com sucesso, retorna o id e o token
};

// Entrando com usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Checando se o usuário existe
  if (!user) {
    res.status(404).json({ errors: ['Usuário não encontrado.'] });
    return; // Se o usuário não existir irá retornar o erro
  }

  // Checar se a senha combina
  if (!(await bcrypt.compare(password, user.password))) {
    // Método do bcrypt para validar a senha
    res.status(422).json({ errors: ['Senha inválida.'] });
    return;
  } // Se a senha estiver incorreta irá retornar o erro

  // Caso esteja tudo certo, retorna o usuário e o token
  res.status(201).json({
    _id: user.id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  }); // Se o usuário foi validado com sucesso, retorna o id, imagem de perfil e token
};

// Pegar usuário logado
const getCurrentUser = async (req, res) => {
  const user = req.user; // Usuário passado no middleware de Auth

  res.status(200).json(user);
};

// Update de usuário
const update = async (req, res) => {
  const { name, password, bio } = req.body; // Traz os dados do corpo da requisição

  let profileImage = null; // Define a imagem de perfil como null

  if (req.file) {
    profileImage = req.file.filename; // Se houver imagem, irá pegar o endereço da imagem
  }

  const reqUser = req.user; // Pega o usuário da requisição

  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
    '-password',
  );

  if (name) {
    user.name = name;
  }

  if (password) {
    // Gerar hash de senha (SEGURANÇA)
    const salt = await bcrypt.genSalt(); // Polui a string da senha
    const passwordHash = await bcrypt.hash(password, salt); // Gera uma senha aleatória para o sistema

    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();
  res.status(200).json(user);
};

// Buscar usuário por ID
const getUserById = async (req, res) => {
  const { id } = req.params; // Pega o id pela URL

  try {
    const user = await User.findById(mongoose.Types.ObjectId(id)).select(
      '-password',
    );

    // Checar se o usuário existe
    if (!user) {
      res.status(404).json({ errors: ['Usuário não encontrado'] });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(422).json({ errors: ['Usuário não encontrado'] });
    return;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
