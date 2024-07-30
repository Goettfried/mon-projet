require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    const { name, email, phone, message, type } = JSON.parse(event.body);

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: type === 'Je recherche du travail' ? 'Bienvenue, merci pour votre démarche' : 'Bienvenue, merci pour votre démarche',
        html: `
            <p>Bonjour ! Je vous souhaite la bienvenue, merci pour votre démarche.</p>
            ${type === 'Je recherche du travail' ? `
                <p>Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, j'aimerais vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme.</p>
                <p>Je serais enchanté de vous aider. Meilleures salutations.</p>
                <img src="https://welshrecrutement.netlify.app/images/image (44).png" alt="Nicolas Ballu">
            ` : `
                <p>Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes <a href="https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf">conditions générales</a>.</p>
                <p>Si vous êtes plutôt intéressé(e) par de la location de services, ignorez ça pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous.</p>
                <p>Je me réjouis de faire affaire avec vous. Meilleures salutations.</p>
                <img src="https://welshrecrutement.netlify.app/images/image (44).png" alt="Nicolas Ballu">
            `}
        `
    };

    if (type === 'Je recherche du personnel') {
        mailOptions.attachments = [{
            filename: 'conditions_generales_nicolas_ballu.pdf',
            path: 'https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf'
        }];
    }

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email envoyé avec succès!' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erreur lors de l\'envoi de l\'email: ' + error.message })
        };
    }
}