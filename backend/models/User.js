const mongoose = require('mongoose'); // Importa o mongoose
const { Schema } = mongoose; // Importa o Schema, esquema como o model é construído

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  }, // Objeto no qual serão passados os campos da collection
  {
    timestamps: true, // cria os campos createdAt e updatedAt no model
  }, // config do model
);

const User = mongoose.model('User', userSchema); // Define um model com nome user e schema criado acima

module.exports = User;
