//setting up connection with mongoDB using mongoose
const mongoose = require('mongoose');

const ConnectToMongo = async () => {
   await mongoose.connect('mongodb+srv://vinitpatidar780:1234567890@cluster0.rcrheqo.mongodb.net/?retryWrites=true&w=majority');

    mongoose.connection.on('connected', () => {
        console.log('Connected to Mongo Successfully');
    })

    mongoose.connection.on('error', () => {
        console.log('Unable to Connect With Mongo');
    }
    )
}

module.exports = ConnectToMongo;