const nodemailer = require('nodemailer');

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

        let adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'rhsmart.ballu@gmail.com',
            subject: 'Nouveau formulaire de contact',
            text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}\nChoix: ${choice}`
        };

        let userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vous avez fait le bon choix !',
            text: ''
        };

        if (choice === 'work') {
            userMailOptions.text = `Bonjour !\n\nJe vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme.\n\nJe serais enchanté de vous aider.\n\nMeilleures salutations.`;
        } else if (choice === 'staff') {
            userMailOptions.text = `Bonjour !\n\nJe vous souhaite la bienvenue, merci pour votre démarche.\n\nSi vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales : [conditions_generales_nicolas_ballu.pdf](https://votre-site.com/public/conditions_generales_nicolas_ballu.pdf).\n\nSi vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous.\n\nJe me réjouis de faire affaire avec vous.\n\nMeilleures salutations.`;
        }

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error sending email: ' + error.message })
        };
    }
};
