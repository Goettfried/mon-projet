const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    const { name, email, message, formType } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
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
            text: `Bonjour ${name}!\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider.\n\nMeilleures salutations.`
        };
    } else if (formType === 'hire') {
        mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vous avez fait le bon choix !',
            text: `Bonjour ${name}!\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales : ${process.env.SITE_URL}/conditions_generales_nicolas_ballu.pdf\n\nSi vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous.\n\nMeilleures salutations.`
        };
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