var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const memeCollection = new Schema({
  
           role:{type:String},
           memeTrendS:{type:String},
           memeTrendSA:[]

})

var adminSetMTT =  mongoose.model('adminSetMTT',memeCollection);

module.exports={adminSetMTT}
