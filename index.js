const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const api = process.env.HOST;

app.get('/',(req,res)=>{res.sendFile(__dirname+'/public/index.html')});

app.listen(port,()=>{console.log(`http://${api}:${port}`)});