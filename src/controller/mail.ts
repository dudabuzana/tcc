const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "mail.diegopinho.com.br",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "no-reply@diegopinho.com",
        pass: "senhaqualquerdeteste"
    },
    tls: { rejectUnauthorized: false }
});

const mailOptions = {
    from: 'no-reply@diegopinho.com',
    to: 'destinatario@yahoo.com',
    subject: 'E-mail enviado usando Node!',
    text: 'Bem fácil, não? ;)'
};

export function sendMail() {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}