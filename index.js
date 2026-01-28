const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const api = process.env.HOST;



app.listen(port,()=>{console.log(`http://${api}:${port}`)});