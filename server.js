const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//Load env variables
dotenv.config({ path: './config/config.env' });
const app = express();

//Conenct to DB
connectDB();

//Routes
const bootcamps = require('./routes/bootcamps');
const { promises } = require('dns');

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

//Server up
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold)
);


//Handle unhandled promise regections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    //Close server & exit process
    server.close(() => {
        process.exit(1);
    })
})

