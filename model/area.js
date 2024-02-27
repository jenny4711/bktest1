
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
require('dotenv').config()

const areaSchema=Schema({
 date:{
  type:String,
  required:true,
 },
 area:{
  type:String,
  required:true,

 },
 kind:{
  type:String,
  required:true,
 },
 resuit:{
  type:String,

 }
},{timestamps:true})

areaSchema.method.toJSON=function(){
  const obj=this._doc;
  delete obj.__v;
  return obj
}

const Area = mongoose.model("Area",areaSchema)
module.exports=Area;