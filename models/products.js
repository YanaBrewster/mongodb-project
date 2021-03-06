const mongoose = require('mongoose');  // since we are using Moongoose we have to require it

const productSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : String,
  price : Number,
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }

});
// For it to be used
module.exports = mongoose.model('Product', productSchema);
