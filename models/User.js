
const mongoose = require("mongoose");

// Définition du schéma User
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Obligatoire
  },
  email: {
    type: String,
    required: true,
    unique: true, // Pas de doublons
  },
  age: {
    type: Number,
    default: 18, // Valeur par défaut
  },
});

// Export du modèle
module.exports = mongoose.model("User", UserSchema);
