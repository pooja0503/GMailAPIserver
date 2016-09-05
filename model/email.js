var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var emails= new Schema({
  msgId:String,
  msgFrom: String,
  msgTo: String,
  msgSubject:String,
  message: String
});

module.exports=mongoose.model("Emails",emails);
