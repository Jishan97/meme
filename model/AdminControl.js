var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adminControlS = new Schema({
        role:{type:String,default:'Admin'},
        meme_count:{type:Number},
        upcoming_event:[
            {name:String,date:String,image:String}
        ],
        meme_tags:[],
        meme_trending_topics:[],
        meme_of_the_day:[
            {meme_id:Number}
        ],
        trophy:[
            {name:String,image:String,uploads:Number}
        ],
        googleAds:{
            type:Boolean,
            default:false
        }

})

var adminControl =  mongoose.model('adminControl',adminControlS);

module.exports={adminControl}
