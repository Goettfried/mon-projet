const nodemailer = require('nodemailer');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        const { name, email, message, choice } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'rhsmart.ballu@gmail.com',
            subject: 'Nouveau message de contact',
            text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Message personnalisé pour l'utilisateur
        let userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vous avez fait le bon choix !',
            text: choice === 'work'
                ? "Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider. Meilleures salutations."
                : "Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales. Si vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous. Meilleures salutations.\n\nLien : [https://votre-site.com/public/conditions_generales_nicolas_ballu.pdf](https://votre-site.com/public/conditions_generales_nicolas_ballu.pdf)"
        };

        // Envoi de l'email à l'administrateur
        let adminInfo = await transporter.sendMail(mailOptions);
        console.log('Email sent to admin: ' + adminInfo.response);

        // Envoi de l'email à l'utilisateur
        let userInfo = await transporter.sendMail(userMailOptions);
        console.log('Email sent to user: ' + userInfo.response);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Emails sent successfully' })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error sending email: ' + error.message })
        };
    }
};
