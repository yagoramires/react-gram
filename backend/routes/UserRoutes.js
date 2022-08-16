const express = require('express');
const router = express.Router();

// Controller
const { register, login } = require('../controllers/UserController');

// Middlewares
const validate = require('../middlewares/handleValidation');
const {
  userCreateValidation,
  loginValidation,
} = require('../middlewares/userValidations');

// Routes
router.post('/register', userCreateValidation(), validate, register); // Rota, middleware e funcao
router.post('/login', loginValidation(), validate, login); // Rota, middleware e funcao

module.exports = router;
