var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactUsS = new Schema({
  
   email:{
       type:String
   },
   msg:{
       type:String
   }

})

var contactUs =  mongoose.model('contactUs',contactUsS);

module.exports={contactUs}
