var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FarmSchema   = new Schema({
    name:String, /*Farm Name, assigned by user when registering Farm to his profile*/
    userId: {type:String, default:""}, /*Representa el usuario al que pertenece este monitor*/
    status: {type:Boolean,default:false}, /*true si el monitor tiene una conexión abierta con el servidor, false de lo contrario*/
    lastConnection: {type:Number,default:Date.now()},
});

module.exports = mongoose.model('Farm', FarmSchema);
