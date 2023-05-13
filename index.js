const express = require('express');
const morgan = require('morgan');

require('dotenv').config()

const app = express();

const userRouter = require('./src/routes/users');
const todoListRouter = require('./src/routes/todolists');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})

app.use('/users', userRouter);
app.use('/todolists', todoListRouter);

module.exports = app;