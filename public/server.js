const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const sendEmail = require('./functions/sendTestEmail');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware de sécurité Helmet
app.use(helmet());

// Limitation de taux
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limite chaque IP à 10 requêtes par `window` (ici, par 15 minutes)
  message: 'Trop de requêtes créées à partir de cette IP, veuillez réessayer après 15 minutes',
});

app.use('/api/', limiter); // Appliquer la limitation de taux uniquement à l'API

app.use(bodyParser.json());

app.post('/api/send-email', [
  body('name').trim().notEmpty().withMessage('Le nom est requis.'),
  body('email').isEmail().withMessage('L\'email doit être valide.'),
  body('phone').optional().trim().isLength({ min: 10, max: 15 }).withMessage('Le numéro de téléphone doit être valide.'),
  body('message').trim().notEmpty().withMessage('Le message est requis.'),
  body('type').trim().notEmpty().withMessage('Le type de demande est requis.')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, message, type } = req.body;

  sendEmail(name, email, phone, message, type)
    .then(() => res.status(200).send('Email envoyé avec succès'))
    .catch(error => res.status(500).send(`Erreur lors de l'envoi de l'email: ${error.message}`));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});