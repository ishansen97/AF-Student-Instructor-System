const nodemailer = require('nodemailer');

const MailSender = function () {
    this.sendMail = (receiver, message, subject) => {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                service: 'gmail',
                auth: {
                    user: 'ishanksen@gmail.com',
                    pass: 'hvmycxluuxklrwel'
                }
            });

            const mailOptions = {
                from: 'ishanksen@gmail.com', // sender address
                to: receiver, // list of receivers
                subject: subject, // Subject line
                html: '<p>' + message + '</p>'// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                    reject({status: 500, message: err})
                else
                    resolve({status: 201, message: info})
            });

        })
    }
}

module.exports = new MailSender();