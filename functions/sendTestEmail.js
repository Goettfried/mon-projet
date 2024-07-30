const nodemailer = require('nodemailer');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        const { name, email, message, formType } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions;
        if (formType === 'work') {
            mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Vous avez fait le bon choix !',
                text: `Bonjour ${name} !\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider. \n\nMeilleures salutations.`
            };
        } else if (formType === 'staff') {
            mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Vous avez fait le bon choix !',
                text: `Bonjour ${name} !\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales : ${process.env.SITE_URL}/public/conditions_generales_nicolas_ballu.pdf\nSi vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. \n\nJe me réjouis de faire affaire avec vous. \n\nMeilleures salutations.`
            };
        }

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error sending email: ' + error.message })
        };
    }
};