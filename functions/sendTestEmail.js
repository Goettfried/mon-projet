const nodemailer = require('nodemailer');

const sendEmail = async (name, email, phone, message, type) => {
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
    subject: type === 'job' ? 'Vous avez fait le bon choix !' : 'Vous avez fait le bon choix !',
    text: type === 'job' ?
      `Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, j'aimerais vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme(s). Je serais enchanté de vous aider. Meilleures salutations.` :
      `Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales. Si vous êtes plutôt intéressé(e) par de la location de services, ignorez ça pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous. Meilleures salutations.\n\nLien : https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf`
  };

  if (phone) {
    mailOptions.text += `\n\nNuméro de téléphone: ${phone}`;
  }

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
