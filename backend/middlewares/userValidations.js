const { body } = require('express-validator');

const userCreateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('O nome é obrigatório.')
      .isLength({ min: 3 })
      .withMessage('O nome precisa ter pelo menos 3 caracteres.'),
    body('email')
      .isString()
      .withMessage('O e-mail é obrigatório.')
      .isEmail()
      .withMessage('Insira um e-mail válido.'),
    body('password')
      .isString()
      .withMessage('A senha é obrigatória.')
      .isLength({ min: 6 })
      .withMessage('A senha precisa ter no mínimo 6 caracteres.'),
    body('confirmpassword')
      .isString()
      .withMessage('A confirmação de senha é obrigatória.')
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error('As senhas precisam ser iguais.');
        }
        return true;
      }),
  ]; // Este método irá validar os dados recebidos na requisição

  // is String - validação de tipo(type)
  // is Length - validação de quantidade de caracteres
  // is Email - validação se é um email válido
  // custom - variação customizada, neste caso para validar se as senhas são iguais
};

const loginValidation = () => {
  return [
    body('email')
      .isString()
      .withMessage('O e-mail é obrigatório.')
      .isEmail()
      .withMessage('Insira um e-mail válido.'),
    body('password').isString().withMessage('A senha é obrigatória.'),
  ];
};

module.exports = { userCreateValidation, loginValidation };
