var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AnbauSchema   = new Schema({
    name:String, /*Farm Name, assigned by user when registering Farm to his profile*/
    userId: {type:String, default:""}, /*Representa el usuario al que pertenece este monitor*/
});

module.exports = mongoose.model('Anbau', AnbauSchema);
