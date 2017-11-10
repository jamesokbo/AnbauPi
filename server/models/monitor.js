var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MonitorSchema   = new Schema({
    name:String, /*Farm Name, assigned by user when registering Farm to his profile*/
    anbauId: {type:String, default:""},
    userId: {type:String, default:""}, /*Representa el usuario al que pertenece este monitor*/
    status: {type:Boolean,default:false}, /*true si el monitor tiene una conexión abierta con el servidor, false de lo contrario*/
    lastConnection: {type:Number,default:Date.now()},
});

module.exports = mongoose.model('Monitor', MonitorSchema);
