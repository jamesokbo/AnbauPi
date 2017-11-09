var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var sensorSchema= mongoose.Schema({
    farmId:String, /*Id of the monitor to which this sensor belongs to*/
    type:String, /*sensor type*/
    nameIcon:String,
    unit:{type:String},
    reading: {data:Number, date:Number},
    calibration:{
      singlePoint:{status:Boolean, date:{type:Number,default:Date.now}},
      twoPoint:{status:Boolean, date:{type:Number,default:Date.now}},
      threePoint:{status:Boolean, date:{type:Number,default:Date.now}}
    }
});

module.exports=mongoose.model('Sensor',sensorSchema);
