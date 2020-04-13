var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userschema = new Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    prefrences:{
        type:String
    },
    
    gender:{
        type:String
    },
    
    location:{
        type:String
    },
    
    prefrences:{
        type:String
    },
    
    user_tag:{
        type:String
    },
    
    user_achivement:{
        type:String
    },
    
    user_status:{
        type:String
    },

    user_memes:[
        {
            id:{type:String},
            meme_tag:{type:String,default:'new'},
            meme_title:{type:String},
            meme_description:{type:String},
            meme_image:{type:String},
            meme_createdAt:{type:String},
            meme_location:{type:String},
            meme_type:{type:String},
            meme_category:{type:String},
            meme_likes:{type:String},
            meme_shared:{type:String},
            meme_status:{type:String,default:'waiting'},
            meme_trend:{type:String}
 
        }
    ],

    user_memes_video:[
        {
            id:{type:String},
            meme_tag:{type:String,default:'new'},
            meme_title:{type:String},
            meme_description:{type:String},
            meme_video:{type:String},
            meme_createdAt:{type:String},
            meme_location:{type:String},
            meme_type:{type:String},
            meme_category:{type:String},
            meme_likes:{type:String},
            meme_shared:{type:String},
            meme_status:{type:String,default:'waiting'}
        }
    ]

})

var MemeUser =  mongoose.model('Memeuser',userschema);

module.exports={MemeUser}
