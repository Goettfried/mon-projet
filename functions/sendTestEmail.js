const nodemailer = require('nodemailer');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'rhsmart.ballu@gmail.com',
            subject: 'Test Email',
            text: 'This is a test email sent from Node.js using Nodemailer.',
            attachments: [{
                filename: 'Conditions Générales - Nicolas BALLU.pdf',
                path: path.resolve(__dirname, 'Conditions Générales - Nicolas BALLU.pdf'),
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