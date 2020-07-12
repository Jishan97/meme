const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const trophySegments = new Schema({
  
    trophyImage:{
        type:String
    },
    trophyPoints:{
        type:String
    },
    trophyType:{
        type:String
    },
    trophyName:{
        type:String
    },
 
 })
 
 var trophySegment =  mongoose.model('trophySegment',trophySegments);
 
 module.exports={trophySegment}