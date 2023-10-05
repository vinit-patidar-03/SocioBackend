const express = require('express');
require('dotenv').config({path: './.env'});
const cors = require('cors');
const ConnectToMongo = require('./db');
// const fileupload = require('express-fileupload');
const app = express();
// const path = require('path')
const PORT = process.env.PORT || 5000;

ConnectToMongo();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
//Now a days body-parser is built in already so we don't have any need to add it in our backend file. 
// app.use(fileupload({
//     useTempFiles : true
// }))

//To parse the request based on json payloads.
app.use(express.json());

//use cors(cross origin resources sharing) policy when we are sharing the data from one port to another port otherwise it will give an error.
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET","PUT","POST","DELETE"],
    credentials: true
}));

app.use('/instagram/auth',require('./routes/auth'));
app.use('/instagram/posts',require('./routes/posts'));

app.listen(PORT,()=>
{
    console.log(`server is running on port http://localhost:${PORT}`)
})

// //serving frontend on same url
// app.use(express.static(path.join(__dirname,"./frontend/build")));

// app.get("*",(req,res)=>
// {
//     res.sendFile(path.join(__dirname,"./frontend/build/index.html"),(error)=>{res.status(500).send(error)});
// })