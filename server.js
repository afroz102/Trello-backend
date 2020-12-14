const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

/*
// Config.env to ./config/config.env
require('dotenv').config({
    path: './config/config.env'
});
*/

// Connect to database
connectDB();

app.use(express.json());


let origin = process.env.CLIENT_URL;

// Config only for development
if (process.env.NODE_ENV === 'development') {
    origin = 'http://localhost:3000';
}

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', origin);
    next();
});

app.use(cors({
    credentials: true,
    origin: true
}));
// app.use(cors());
// app.use(morgan('dev'));

// Load all routes
const userRouter = require('./routes/userRouter');
const boardRouter = require('./routes/board.route');
const listRouter = require('./routes/list.route');
const cardRouter = require('./routes/card.route');
const searchRouter = require('./routes/search.route');

// Use routes
app.use('/api/user/', userRouter);
app.use('/api/board/', boardRouter);
app.use('/api/list/', listRouter);
app.use('/api/card/', cardRouter);
app.use('/api/search/', searchRouter);


app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found"
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
});