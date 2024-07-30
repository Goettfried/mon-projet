const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
    const { name, email, message, type } = JSON.parse(event.body);

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
    };

    if (type === 'travail') {
        mailOptions.html = `<p>Bonjour ${name} !</p><p>Je vous souhaite la bienvenue, merci pour votre démarche. Je vais prendre contact avec vous très prochainement.</p><p>Pour aller de l'avant, je souhaiterais d'abord vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme.</p><p>Je serais enchanté de vous aider.</p><p>Meilleures salutations.</p>`;
    } else if (type === 'personnel') {
        mailOptions.html = `<p>Bonjour ${name} !</p><p>Je vous souhaite la bienvenue, merci pour votre démarche.</p><p>Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter ce lien, qui vous mènera à mes conditions générales : <a href="https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf">Conditions Générales</a>.</p><p>Si vous êtes plutôt intéressé(e) par de location de services, ignorez-le pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous.</p><p>Je me réjouis de faire affaire avec vous.</p><p>Meilleures salutations.</p>`;
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