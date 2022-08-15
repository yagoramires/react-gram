const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userName: String,
    userId: mongoose.ObjectId, // Objeto especial do mongoose
  },
  {
    timestamps: true,
  },
);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;

// Esqueleto da collection
