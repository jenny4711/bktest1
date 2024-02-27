const express = require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser");
const cors=require("cors")
const app=express()
const indexRoutes = require('./routes/index');
require("dotenv").config()
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use('/project',indexRoutes)
app.use(express.json())


app.listen(process.env.PORT || 5000,()=>{
  console.log('server on');
})