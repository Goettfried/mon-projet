const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./functions/sendTestEmail');

const app = express();

app.use(bodyParser.json());

app.post('/api/send-email', (req, res) => {
  const { name, email, phone, message, type } = req.body;
  sendEmail(name, email, phone, message, type)
    .then(() => res.status(200).send('Email envoyé avec succès'))
    .catch(error => res.status(500).send(`Erreur lors de l'envoi de l'email: ${error.message}`));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});