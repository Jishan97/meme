var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const memeCollection = new Schema({

    memeTitle:{type:String},
    memeTT:{type:String}

})

var AllMemeTT =  mongoose.model('AllMemeTT',memeCollection);

module.exports={AllMemeTT}
