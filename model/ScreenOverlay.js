const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const screenOverlays = new Schema({
  
    posterName:{
        type:String
    },
    posterDescription:{
        type:String
    },
    posterImage:{
        type:String
    }
 
 })
 
 var screenOverlay =  mongoose.model('screenOverlay',screenOverlays);
 
 module.exports={screenOverlay}