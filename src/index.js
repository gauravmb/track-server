//To Create Schma single time
require('./models/User')
require('./models/Track')

const express = require("express")
const mongoose  = require("mongoose")
const bodyParser = require('body-parser')
const authRoutes = require("./routes/authRoutes")
const trackRoutes = require("./routes/trackRoutes")
const requestAuth = require("./middlewares/requestAuth")

const app = express();
app.use(bodyParser.json())
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://gauravmbhatia:12345@cluster0.c5wak.mongodb.net/testdb?retryWrites=true&w=majority';

mongoose.connect(mongoUri,{
});

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo instance");
})

mongoose.connection.on('error',()=>{
    console.log("Connection to mongo instance failed");
})

app.get('/',requestAuth,(req,res)=>{
    res.send(`Logged in as ${res.user.email}`)
});

app.listen(3000,()=>{
    console.log('Listening on Port 3000');
})