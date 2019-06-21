const express = require('express');
const app = express();
const Bundler = require('parcel-bundler');
const route = require('./app/routes/InstructorRoutes');

const bundler = new Bundler('./public/index.html', {});

app.use(express.json());
app.use(express.static('./dist'));

app.use('/api/instructor', route);

app.use(bundler.middleware());

/*
app.use('/', (req, res, next) => {
    res.sendFile('./dist/index.html');
});
*/

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(3000, err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log('Server is started on port 3000');
});