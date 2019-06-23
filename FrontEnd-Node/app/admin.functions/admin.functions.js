const nodemailer = require('nodemailer');

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
    to: 'it17138000@my.sliit.lk', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
    if(err)
        console.error(err)
    else
        console.log(info);
});

