const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  } // Se não houver erro, ele irá prosseguir a requisição

  const extractedErrors = []; // Cria um array vazio

  errors.array().map((err) => extractedErrors.push(err.msg)); // Faz um map nos erros e os inclui a mensagem do erro no array criado

  return res.status(422).json({
    errors: extractedErrors,
  }); // Esta resposta será consumida no front end, recebendo um array de erros em json; O status 422 comunica que a requisição não foi bem sucedida
};

module.exports = validate;

// Este middleware serve para validar se há ou não erros na requisição, caso haja ele irá retornar uma array com os erros
