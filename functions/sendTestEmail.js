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

    const responseMessagePersonnel = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Merci pour votre démarche',
        html: `
            <p>Bonjour !</p>
            <p>Je vous souhaite la bienvenue, merci pour votre démarche.</p>
            <p>Si vous êtes intéressé(e) par mes prestations de placement fixe, je vous invite à consulter <a href="https://welshrecrutement.netlify.app/conditions_generales_nicolas_ballu.pdf">ce lien</a>, qui vous mènera à mes conditions générales.</p>
            <p>Si vous êtes plutôt intéressé(e) par de la location de services, ignorez ça pour le moment : je vous invite à me soumettre le nombre de travailleurs dont vous aurez besoin ainsi que la durée de leur mission, puis je prendrai rapidement contact avec vous.</p>
            <p>Je me réjouis de faire affaire avec vous.</p>
            <p>Meilleures salutations.</p>
            <img src="https://welshrecrutement.netlify.app/images/image (44).png" alt="Avatar" style="width: 50px; height: 50px;">
        `
    };

    const responseMessageTravail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Merci pour votre démarche',
        html: `
            <p>Bonjour !</p>
            <p>Je vous souhaite la bienvenue, merci pour votre démarche.</p>
            <p>Je vais prendre contact avec vous très prochainement.</p>
            <p>Pour aller de l'avant, j'aimerais vous demander de me soumettre votre dossier complet, comportant CV, attestation/certificats de travail et diplôme.</p>
            <p>Je serais enchanté de vous aider.</p>
            <p>Meilleures salutations.</p>
            <img src="https://welshrecrutement.netlify.app/images/image (44).png" alt="Avatar" style="width: 50px; height: 50px;">
        `
    };

    try {
        await transporter.sendMail(mailOptions);

        if (message === "Je recherche du personnel") {
            await transporter.sendMail(responseMessagePersonnel);
        } else {
            await transporter.sendMail(responseMessageTravail);
        }

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