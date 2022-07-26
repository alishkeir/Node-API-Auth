const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const AuthRoute = require('./routes/auth.route');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));

app.get('/', async (req, res) => {
    res.send('Hello from express');
});

app.use('/auth', AuthRoute);

// handle not found urls
app.use(async (req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
