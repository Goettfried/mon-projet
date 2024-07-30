require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    const { name, email, phone, message } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmation de votre message',
        text: generateEmailText(name, message),
        attachments: []
    };

    if (phone) {
        mailOptions.text += `\n\nNuméro de téléphone : ${phone}`;
    }

    if (message.includes('personnel')) {
        mailOptions.attachments.push({
            filename: 'conditions_generales_nicolas_ballu.pdf',
            path: `${process.env.SITE_URL}/conditions_generales_nicolas_ballu.pdf`
        });
    }

    try {
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};

function generateEmailText(name, message) {
    if (message.includes('personnel')) {
        return `Bonjour ${name},\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter mes conditions générales jointes (lien vers le pdf). Si vous êtes plutôt intéressé(e) par de la location de services, ignorez-les pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous.\n\nMeilleures salutations.`;
    } else {
        return `Bonjour ${name},\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider.\n\nMeilleures salutations.`;
    }
}