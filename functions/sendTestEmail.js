const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(name, email, phone, message, type) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: type === 'job' ? 'Nouvelle demande de recherche d\'emploi' : 'Nouvelle demande de recherche de personnel',
      html: `
        <h3>Nom: ${name}</h3>
        <p>Email: ${email}</p>
        <p>Téléphone: ${phone}</p>
        <p>Message: ${message}</p>
      `,
    };

    await transport.sendMail(mailOptions);
    return 'Email envoyé avec succès';
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = sendEmail;
