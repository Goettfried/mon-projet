require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  const { name, email, phone, message, option } = JSON.parse(event.body);

  let emailContent = '';

  if (option === 'travail') {
    emailContent = `
      <p>Bonjour ${name},</p>
      <p>Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider. Meilleures salutations.</p>
    `;
  } else if (option === 'personnel') {
    emailContent = `
      <p>Bonjour ${name},</p>
      <p>Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes <a href="${process.env.SITE_URL}/conditions_generales_nicolas_ballu.pdf">conditions générales</a>.
      <br>Si vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous. Meilleures salutations.</p>
    `;
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Vous avez fait le bon choix !',
    html: emailContent
  };

  const notificationMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Nouveau formulaire soumis',
    html: `
      <p>Nom: ${name}</p>
      <p>Email: ${email}</p>
      <p>Numéro de téléphone: ${phone}</p>
      <p>Message: ${message}</p>
      <p>Option: ${option}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(notificationMailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};