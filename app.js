const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const playRouter = require('./routes/play')

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    console.log(`API listening on ${port}!`);
    if (err) throw err;
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/play', playRouter)

module.exports = app;