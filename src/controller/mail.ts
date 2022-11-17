const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1ee3c300f38e92",
      pass: "3d2f5e5c1feef8"
    }
});

const mailOptions = (nome: string, data: Date, config: number) => ({
    from: 'no-reply@magnolia.com',
    to: 'destinatario@magonlia.com',
    subject: 'Magnolia - Respostas Submetidas',
    html: `Prezado(a) ${nome}<br><br>Seu formulário da data ${data.getDate()}/${data.getMonth()}/${data.getFullYear()} atingiu ${config}% de respostas submetidas!<br><br><b>Verifique o sistema para mais informações.</b>`
});

export function sendMail(nome: string, data: Date, config: number) {
    transport.sendMail(mailOptions(nome, data, config), function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}