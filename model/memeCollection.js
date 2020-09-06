var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const memeCollection = new Schema({
  
            meme_title:{type:String},
            meme_description:{type:String},
            meme_image:{type:String},
            meme_createdAt:{type:String},
            meme_location:{type:String},
            meme_type:{type:String}, /* type and tags are same */
            meme_category:{type:String},
            meme_likes:{type:String},
            meme_shared:{type:String},
            meme_status:{type:String},
            meme_by:{type:String},
            meme_trend:{type:String},
            meme_by_avatar:{type:String}
 

})

var MemeData =  mongoose.model('MemeData',memeCollection);

module.exports={MemeData}
