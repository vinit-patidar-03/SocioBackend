const express = require('express');
// require('dotenv').config({path: './.env'});
const cors = require('cors');
const ConnectToMongo = require('./db');
// const fileupload = require('express-fileupload');
const app = express();
// const path = require('path')
const PORT = 5000 || process.env.PORT;

ConnectToMongo();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
//Now a days body-parser is built in already so we don't have any need to add it in our backend file. 
 

//To parse the request based on json payloads.
app.use(express.json());

//use cors(cross origin resources sharing) policy when we are sharing the data from one port to another port otherwise it will give an error.
app.use(cors());

app.use('/sociogram/auth',require('./routes/auth'));
app.use('/sociogram/posts',require('./routes/posts'));

app.get('/',(req,res)=>{
    res.send('started')
})
app.listen(PORT,()=>
{
    console.log(`server is running on port http://localhost:${PORT}`)
})