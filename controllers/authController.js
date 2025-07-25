const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Vérifier que l'email n'existe pas déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Cet email est déjà utilisé." });
        }
        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        // Création utilisateur
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "Inscription réussie !" });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'inscription.", error: err });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Recherche de l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Identifiants incorrects." });
        }
        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Identifiants incorrects." });
        }
        // Générer le token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la connexion.", error: err });
    }
};
