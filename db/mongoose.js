// const mongoose = require('mongoose');


// mongoose.Promise=global.Promise;
// mongoose.connect('mongodb+srv://admin:admin123@cluster0-f1gpb.mongodb.net/test?retryWrites=true&w=majority');

// module.exports={
//     mongoose
// };


const mongoose = require('mongoose');


mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://jishan:hetvi27@cluster0-tnq7r.mongodb.net/test?retryWrites=true&w=majority');

module.exports={
    mongoose
};
