var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const memeStarInfo = new Schema({
            role:{type:String,
            default:'admin'},
           NoOfUploads:{type:Number},
           NoOfAchivements:[],
           users:[]
})

var memeStar =  mongoose.model('memeStar',memeStarInfo);

module.exports={memeStar}
