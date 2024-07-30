const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const { name, email, phone, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Notification à l'admin
        subject: 'Nouveau message de ' + name,
        text: `Nom: ${name}\nEmail: ${email}\nNuméro de téléphone: ${phone}\nMessage: ${message}`
    };

    const responseMessage = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Merci pour votre démarche',
        text: `Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche. ${
            message.includes('personnel') 
            ? `Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter mes conditions générales jointes (lien vers le pdf). Si vous êtes plutôt intéressé(e) par de la location de services, ignorez-les pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous.`
            : `Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider.`
        }\nMeilleures salutations.`,
        attachments: message.includes('personnel') 
        ? [{ path: 'https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf' }] 
        : []
    };

    try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(responseMessage);
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