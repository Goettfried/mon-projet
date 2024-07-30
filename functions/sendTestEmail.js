const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
    try {
        const { name, email, message, responseMessage } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email to site admin
        const mailOptionsAdmin = {
            from: process.env.EMAIL_USER,
            to: 'rhsmart.ballu@gmail.com',
            subject: 'Nouveau message de contact',
            text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Response email to user
        const mailOptionsUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Vous avez fait le bon choix !',
            text: responseMessage
        };

        await transporter.sendMail(mailOptionsAdmin);
        await transporter.sendMail(mailOptionsUser);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Emails sent successfully' })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error sending email: ' + error.message })
        };
    }
};
