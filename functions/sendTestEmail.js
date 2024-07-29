const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        // Extraction des données du formulaire à partir de l'événement
        const { name, email, message } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // Utilisez l'email fourni dans le formulaire
            subject: `Nouveau message de ${name}`,
            text: `Vous avez reçu un nouveau message de ${name} (${email}):\n\n${message}`,
            attachments: [{
                filename: 'Conditions Générales - Nicolas BALLU.pdf',
                path: path.join(__dirname, '..', '..', 'public', 'Conditions Générales - Nicolas BALLU.pdf'),
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