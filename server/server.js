//const express =require("express");
import express from "express";
//import router from "./routes/auth";
const morgan = require('morgan');
import cors from 'cors';
import fs from "fs";
const mongoose =require("mongoose");
require('dotenv').config({ path: '.env' });
const app = express();


// db connection
mongoose.connect("mongodb://localhost/booking-database",{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(()=>console.log("DB connected"))
.catch((err)=>console.log("DB connection error",err));

// mongoose.connect("mongodb://localhost/booking-database");
// mongoose.connection.once('open',function(){
//     console.log('connection made...');
// }).on('error',function(error){
//     console.log('connection error:',error);
// });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
fs.readdirSync("./routes").map((r)=>app.use("/api",require(`./routes/${r}`)));
//app.use("/api", router);
const port = process.env.PORT;
app.listen(port,()=>console.log(`server is running on port ${port}`));