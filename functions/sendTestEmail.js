require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    try {
        const { name, email, phone, message, type } = JSON.parse(event.body);

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let subject, text;

        if (type === 'Je recherche du personnel') {
            subject = 'Demande de renseignement - Recherche de personnel';
            text = `Bonjour ${name},\n\nMerci pour votre démarche.\n\nSi vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales: https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf\n\nSi vous êtes plutôt intéressé(e) par de la location de services, ignorez ça pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous.\n\nJe me réjouis de faire affaire avec vous.\n\nMeilleures salutations.`;
        } else {
            subject = 'Demande de renseignement - Recherche de travail';
            text = `Bonjour ${name},\n\nMerci pour votre démarche.\n\nJe vais prendre contact avec vous très prochainement. Pour aller de l'avant, j'aimerais vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme.\n\nJe serais enchanté de vous aider.\n\nMeilleures salutations.`;
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email envoyé avec succès' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};