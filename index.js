const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const api = process.env.HOST;
app.use(express.static(__dirname));

const db = require('./config/db_config');
app.use(express.json());

app.get('/',(req,res)=>{res.sendFile(__dirname+'/public/login.html')});
app.use('/users',require('./routes/users_R'));
app.use('/auth',require('./routes/auth_R'));

app.listen(port,()=>{console.log(`http://${api}:${port}`)});