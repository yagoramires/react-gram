const multer = require('multer'); // Lida com upload de arquivos
const path = require('path'); // Módulo do node que lida com os caminhos dos diretórios

// Destino da imagem

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // função do multer que altera o destino
    // requisição, arquivo e possivel callback. utilizada para executar outra função ali mesmo
    let folder = '';

    if (req.baseUrl.includes('users')) {
      folder = 'users'; // se a url tratar de usuários, irá incluir na pasta users
    } else if (req.baseUrl.includes('photos')) {
      folder = 'photos';
    } // se a url tratar de photos, irá incluir na pasta photos

    cb(null, `uploads/${folder}/`); // configura o destino da imagem
  },
  filename: (req, file, cb) => {
    // função do multer que altera o nome do arquivo
    cb(null, Date.now() + path.extname(file.originalname)); // Pega a string da data e a extensão do arquivo. Ex: 9867adf986asf9.jpeg
    // Lib uuid para garantir que não há chance de repetição em sistema maiores
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // Se a extenção do arquivo for diferente de jpg ou png
      // Upload somente de PNG e JPG
      return cb(new Error('Por favor, envie apenas png ou jpg!'));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
