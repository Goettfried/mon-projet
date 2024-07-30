const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async function (event, context) {
  const { name, email, phone, message, option } = JSON.parse(event.body);

  let subject, text;

  if (option === 'work') {
    subject = 'Vous avez fait le bon choix !';
    text = `Bonjour ${name}!\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider. \n\nMeilleures salutations.`;
  } else if (option === 'hire') {
    subject = 'Vous avez fait le bon choix !';
    text = `Bonjour ${name}!\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales : ${process.env.SITE_URL}/conditions_generales_nicolas_ballu.pdf\n\nSi vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous.\n\nMeilleures salutations.`;
  }

  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  let adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Nouveau formulaire rempli par ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone || 'Non renseigné'}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
};