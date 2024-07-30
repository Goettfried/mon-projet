require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    const { name, email, phone, message, type } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Nouveau contact depuis le site',
        text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}\nType: ${type}`
    };

    if (type === 'personnel') {
        mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vous avez fait le bon choix !',
            text: `Bonjour !\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales: https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf\n\nSi vous êtes plutôt intéressé(e) par de la location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous.\n\nMeilleures salutations.`
        };
    } else if (type === 'travail') {
        mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vous avez fait le bon choix !',
            text: `Bonjour !\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider.\n\nMeilleures salutations.`
        };
    }

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'E-mail envoyé avec succès !' })
        };
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erreur lors de l\'envoi de l\'e-mail.' })
        };
    }
};