const nodemailer = require('nodemailer');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        const body = JSON.parse(event.body);
        const { name, email, message, formType } = body;

        let subject = '';
        let text = '';

        if (formType === 'workForm') {
            subject = 'Vous avez fait le bon choix !';
            text = `Bonjour ${name},

Je vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement. Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme. Je serais enchanté de vous aider.

Meilleures salutations.`;
        } else if (formType === 'personnelForm') {
            subject = 'Vous avez fait le bon choix !';
            text = `Bonjour ${name},

Je vous souhaite la bienvenue, merci pour votre démarche. Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales. Si vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous.

Je me réjouis de faire affaire avec vous.

Meilleures salutations.

[Consultez les conditions générales](https://votre-site.com/public/conditions_generales_nicolas_ballu.pdf)`;
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
            subject: subject,
            text: text,
            html: text.replace(/\n/g, '<br>')
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
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
