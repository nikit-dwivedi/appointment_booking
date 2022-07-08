//----------import dependencies-------------------------------
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

//----------import files--------------------------------------
const { badRequest } = require('./src/v1/api/helpers/response.helper')
const version1Index = require("./src/v1/api/index");


//----------use dependencies----------------------------------
//use morgan
app.use(morgan('dev'));
// use cors
app.use(cors());
//body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//----------redirect routes-----------------------------------
app.use('/v1', version1Index);


//----------for invalid requests start -----------------------


app.all('*', async (req, res) => {
    await badRequest(res, 'Invalid URL');
});
module.exports = app;
