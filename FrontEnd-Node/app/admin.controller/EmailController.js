const express = require('express');
const router = express.Router();
const MailSender = require('../admin.functions/MailSender');

router.post('/send-email', (req, res, next) => {
    const body = req.body;
    MailSender.sendMail(body.receiver, body.message, body.subject).then(data => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

module.exports = router;
