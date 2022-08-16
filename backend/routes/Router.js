const express = require('express'); // Importa o express
const router = express(); // Irá lidar com todas as rotas do app

router.use('/api/users', require('./UserRoutes'));
router.use('/api/photos', require('./PhotoRoutes'));

module.exports = router;
