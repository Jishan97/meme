const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const expoIDS = new Schema({
  
    expoid:{
        type:String
    }
 
 })
 
 var expoID =  mongoose.model('expoID',expoIDS);
 
 module.exports={expoID}