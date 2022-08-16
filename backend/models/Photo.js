const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId, // Objeto especial do mongoose
    userName: String,
  },
  {
    timestamps: true,
  },
);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;

// Esqueleto da collection
