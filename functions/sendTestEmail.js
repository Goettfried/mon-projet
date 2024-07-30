require('dotenv').config();
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    const { name, email, phone, message } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Nouveau message du formulaire de contact',
        text: `Nom: ${name}\nEmail: ${email}\nNuméro de téléphone: ${phone}\nMessage: ${message}`,
        attachments: [
            {
                filename: 'conditions_generales_nicolas_ballu.pdf',
                path: process.env.SITE_URL + '/conditions_generales_nicolas_ballu.pdf'
            }
        ]
    };

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