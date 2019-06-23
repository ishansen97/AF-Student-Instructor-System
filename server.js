const express = require('express');
const app = express();
const Bundler = require('parcel-bundler');
const route = require('./app/routes/message.server.routes');

const bundler = new Bundler('./public/index.html', {});

app.use(express.static('uploads'));
app.use(express.json());

app.use('/api/resources', route);

app.use(bundler.middleware());

app.listen(4000, err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log('Server is started on port 3000');
})