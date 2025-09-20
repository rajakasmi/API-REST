
// Import des modules nécessaires
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

// Charger les variables d'environnement
dotenv.config({ path: "./config/.env" });

// Initialiser express
const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(mongodb://localhost:27017/mydatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } )
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// --------------------- ROUTES ---------------------

// GET : retourner tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // Retourne en JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST : ajouter un nouvel utilisateur
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT : éditer un utilisateur par ID
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // ID dans l’URL
      req.body,      // Nouvelles données
      { new: true }  // Retourner l’objet mis à jour
    );
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE : supprimer un utilisateur par ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------- LANCEMENT DU SERVEUR ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
