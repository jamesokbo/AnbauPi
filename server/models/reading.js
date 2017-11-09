var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var readingSchema= mongoose.Schema({
	farmId:String,
	monitorId:String,
	sensorId:String,
	type:String,
	reading:{data:Number, date:Number},
});

module.exports=mongoose.model('Reading',readingSchema);
