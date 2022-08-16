const express = require('express');
const router = express.Router();

// Controller
const {
  register,
  login,
  getCurrentUser,
  update,
} = require('../controllers/UserController');

// Middlewares
const validate = require('../middlewares/handleValidation');

const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require('../middlewares/userValidations');

const authGuard = require('../middlewares/authGuard');

const { imageUpload } = require('../middlewares/imageUpload');

// Routes
router.post('/register', userCreateValidation(), validate, register); // Rota, middlewares e funcao
router.post('/login', loginValidation(), validate, login); // Rota, middlewares e funcao
router.get('/profile', authGuard, getCurrentUser); // Rota, middleware e funcao
router.put(
  '/',
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single('profileImage'),
  update,
); // Rota, middleware e funcao

module.exports = router;
