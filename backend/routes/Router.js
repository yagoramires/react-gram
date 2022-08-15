const express = require('express'); // Importa o express
const router = express(); // Irá lidar com todas as rotas do app

router.use('/api/users', require('./UserRoutes'));

// Rotas

router.get('/', (req, res) => {
  res.send('API working');
});

module.exports = router;
