const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const morgan = require('morgan');
//ROUTES
const bootcamps = require('./routes/bootcamps');

//LOAD ENV VARIABLES
dotenv.config({ path: './config/config.env' });
const app = express();


//DEV LOGGING MIDLEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//MOUNT ROUTERS
app.use('/api/v1/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000;
//SERVER UP
app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);



