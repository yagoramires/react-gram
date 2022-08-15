const mongoose = require('mongoose');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Conexão com DB

const connection = async () => {
  try {
    const dbConnection = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@reactgram.7xfckni.mongodb.net/?retryWrites=true&w=majority`,
    ); // conexao com banco de dados

    return dbConnection;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
