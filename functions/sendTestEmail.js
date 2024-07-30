const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    const { name, email, phone, message, type } = JSON.parse(event.body);

    let subject = "";
    let text = "";
    let attachments = [];

    if (type === "Je recherche du personnel") {
        subject = "Merci pour votre démarche - Recherche de personnel";
        text = `
            Bonjour ${name} ! 

            Je vous souhaite la bienvenue, merci pour votre démarche. 
            Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales : https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf. 
            Si vous êtes plutôt intéressé(e) par de la location de services, ignorez ça pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. 

            Je me réjouis de faire affaire avec vous.

            Meilleures salutations.
        `;
    } else {
        subject = "Merci pour votre démarche - Recherche de travail";
        text = `
            Bonjour ${name} ! 

            Je vous souhaite la bienvenue et merci pour votre démarche. 
            
            Nous allons échanger ensemble, très prochainement. 
            Pour aller de l'avant, j'aimerais tout d'abord commencer par vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme(s). 
            
            Je serais enchanté de vous aider.

            Meilleures salutations.
        `;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
        attachments: attachments
    };

    const notificationMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Nouvelle demande: ${type}`,
        text: `
            Nom: ${name}
            Email: ${email}
            Numéro de téléphone: ${phone}
            Message: ${message}
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
            body: JSON.stringify({ message: `Erreur lors de l'envoi de l'email: ${error.message}` })
        };
    }
};