var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var monitorSchema= mongoose.Schema({
    userId:String, /*User Id to whom this Monitor belongs to, assigned by the Farm on the monitor side*/
    farmId:String, /*farm Id to whom this Monitor belongs to*/
    name:{type:String, default:'New Monitor'}, /*name of the monitor, assigned by the user*/
    status: {type:Boolean, default:false}, /*true if connected to the farm*/
    lastConnection: {type:Number, default:Date.now()}, /*Last connection to the farm*/
});

module.exports=mongoose.model('Monitor',monitorSchema);
