const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    try {
        const { name, email, message, responseMessage } = JSON.parse(event.body);

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
            subject: `Nouveau message de ${name}`,
            text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        const responseMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Vous avez fait le bon choix !",
            html: responseMessage,
        };

        await transporter.sendMail(responseMailOptions);

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
