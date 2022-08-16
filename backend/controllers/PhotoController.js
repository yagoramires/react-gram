const Photo = require('../models/Photo');
const User = require('../models/User');

const mongoose = require('mongoose');

// Inserir foto com usuário relacionado a ela
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Criar foto
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // Verificar se foi criada com sucesso
  if (!newPhoto) {
    res.status(422).json({
      errors: ['Houve um problema, por favor tente novamente mais tarde.'],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    // Verificar se foto existe
    if (!photo) {
      res.status(404).json({
        errors: ['Foto não encontrada.'],
      });
      return;
    }

    // Verificar se o usuário é o que criou a foto
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ['Ocorreu um erro, por favor etente novamente mais tarde.'],
      });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: 'Foto excluída com sucesso.' });
  } catch (error) {
    res.status(404).json({
      errors: ['Foto não encontrada.'],
    });
    return;
  }
};

// Pegar todas as fotos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}) // .find cria um objeto que filtra, passando ele vazio irá retornar todos
    .sort([['createdAt', -1]]) // Ordenar por data de criação, decrescente
    .exec(); // Executa a 'query'

  res.status(200).json(photos);
};

// Pegar as fotos do usuário
const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id }) // Passa o id do usuário obtido no URL
    .sort([['createdAt', -1]]) // Ordenar por data de criação, decrescente
    .exec(); // Executa a 'query'

  res.status(200).json(photos);
};

// Pegar a foto por id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(mongoose.Types.ObjectId(id)); // Passa o id da imagem obtido no URL

  // Checar se a foto existe
  if (!photo) {
    res.status(404).json({
      errors: ['Foto não encontrada.'],
    });
    return;
  }
  res.status(200).json(photo);
};

// Update foto
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  // Checar se a foto existe
  if (!photo) {
    res.status(404).json({
      errors: ['Foto não encontrada.'],
    });
    return;
  }

  // Checar se a foto pertence ao usuário
  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({
      errors: ['Ocorreu um erro, por favor tente novamente mais tarde.'],
    });
    return;
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  res.status(200).json({ photo, message: 'Título atualizado com sucesso' });
};

// Função de Like na foto
const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(id);

  // Checar se a foto existe
  if (!photo) {
    res.status(404).json({
      errors: ['Foto não encontrada.'],
    });
    return;
  }

  // Checar se o usuário já deu like
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ['Você já curtiu esta foto.'] });
    return;
  }

  // Adiciona o id do usuário no likes array
  photo.likes.push(reqUser._id);

  photo.save();

  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: 'A foto foi curtida' });
};

// Função de Comentários na foto
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);
  const photo = await Photo.findById(id);

  // Checar se a foto existe
  if (!photo) {
    res.status(404).json({
      errors: ['Foto não encontrada.'],
    });
    return;
  }

  // Adicionar os comentários no array
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };
  photo.comments.push(userComment);

  photo.save();

  res.status(200).json({
    comment: userComment,
    message: 'O comentário foi adicionado com sucesso!',
  });
};

// Buscar imagens pelo titulo

const searchPhotos = async (req, res) => {
  const { q } = req.query; // Argumento q da query string da URL

  const photos = await Photo.find({ title: new RegExp(q, 'i') }).exec(); // filtrar por algo que contenha no título. regexp para procurar em qualquer lugar do titulo e i para ignorar o case sensitive

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
