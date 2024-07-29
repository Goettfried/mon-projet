const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendTestEmail() {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'rhsmart.ballu@gmail.com', // Remplacez par votre adresse e-mail
                pass: 'oxrzvaklzzzvzmvv' // Remplacez par votre mot de passe d'application
            }
        });

        const mailOptions = {
            from: 'rhsmart.ballu@gmail.com', // Remplacez par votre adresse e-mail
            to: 'rhsmart.ballu@gmail.com', // Remplacez par l'adresse e-mail du destinataire (vous-même pour le test)
            subject: 'Test Email',
            text: 'This is a test email sent from Node.js using Nodemailer.',
            attachments: [{
                filename: 'Conditions Générales - Nicolas BALLU.pdf',
                path: path.join(__dirname, 'public', 'Conditions Générales - Nicolas BALLU.pdf'),
                contentType: 'application/pdf'
            }]
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendTestEmail();