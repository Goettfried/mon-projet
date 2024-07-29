const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    try {
        // URL publique vers le fichier PDF
        const pdfUrl = `${process.env.SITE_URL}/conditions_generales_nicolas_ballu.pdf`;

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
            text: `This is a test email sent from Node.js using Nodemailer. You can download the PDF using this link: ${pdfUrl}`,
            html: `<p>This is a test email sent from Node.js using Nodemailer. You can download the PDF using this link: <a href="${pdfUrl}">Download PDF</a></p>`
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
