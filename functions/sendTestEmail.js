const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

exports.handler = async function(event, context) {
    try {
        const data = JSON.parse(event.body);
        const { name, email, message } = data;

        const filePath = path.resolve(__dirname, '..', 'public', 'conditions_generales_nicolas_ballu.pdf');
        console.log('Resolved file path:', filePath);

        // Vérifiez si le fichier existe réellement
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
            text: 'Bonjour !\n\nMerci pour votre démarche. Voici les détails que vous avez soumis :\n\n' +
                  `Nom: ${name}\n` +
                  `Email: ${email}\n` +
                  `Message: ${message}\n\n` +
                  'Si vous êtes intéressé(e) par mes prestations de placement fixe, veuillez consulter ce lien pour mes conditions générales : ' +
                  `${process.env.SITE_URL}/public/conditions_generales_nicolas_ballu.pdf\n\n` +
                  'Meilleures salutations.',
            attachments: [{
                filename: 'conditions_generales_nicolas_ballu.pdf',
                path: filePath,
                contentType: 'application/pdf'
            }]
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