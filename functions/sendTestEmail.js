const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

exports.handler = async function(event, context) {
    try {
        const { name, email, message, choix } = JSON.parse(event.body);
        const filePath = path.resolve(__dirname, '..', 'public', 'conditions_generales_nicolas_ballu.pdf');
        console.log('Resolved file path:', filePath);

        if (!fs.existsSync(filePath)) {
            console.error(`Le fichier n'existe pas: ${filePath}`);
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'File not found: ' + filePath })
            };
        }

        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vous avez fait le bon choix !',
            text: choix === 'travail' ? 
                `Bonjour ${name},\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider.\n\nMeilleures salutations.` : 
                `Bonjour ${name},\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales. Si vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous. Je me réjouis de faire affaire avec vous.\n\nMeilleures salutations.`,
            attachments: choix === 'travail' ? [] : [{ filename: 'conditions_generales_nicolas_ballu.pdf', path: filePath }]
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email envoyé avec succès!' })
        };
    } catch (error) {
        console.error('Erreur:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};