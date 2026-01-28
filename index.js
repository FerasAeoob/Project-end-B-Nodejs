const express = require('express');
const app = express();
const port = 3700;
const api = 'localhost';



app.listen(port,()=>{console.log(`http://a${api}:${port}`)});