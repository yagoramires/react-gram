const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Primeiro: verifica se o auth header existe
  // Segundo : Bearer yy41i1iu2ad12459898AS2  - a bearer é separada por espaços, logo precisamos da segunda informação e por isso o split é utilizado, para criar um array com 2 strings e pegar a segunda posição do array ( index 1 )

  // Checar se o cabeçalho da requisição tem um token
  if (!token) return res.status(401).json({ errors: ['Acesso negado!'] });

  try {
    const verified = jwt.verify(token, jwtSecret); // Verifica se o token bate com o secret

    req.user = await User.findById(verified.id).select('-password'); // Mais uma validação(Por ID). Faz com que os dados obtidos sejam acessados de maneira mais facil, sem precisar consultar o banco toda hora, justamente por isso retiramos o password, para que esse dado nao seja passado. Este usuário poderá ser obtido na requesição

    next(); // Prossegue a requisição
  } catch (error) {
    res.status(401).json({ errors: ['Token inválido.'] }); // Caso o usuário tente burlar o token de alguma forma
  }
};

module.exports = authGuard;
