var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AnbauSchema   = new Schema({
    name:String, /*Anbau Name, assigned by user when registering Anbau to his profile*/
    userId: {type:String, default:""}, /*Representa el usuario al que pertenece este monitor*/
});

module.exports = mongoose.model('Anbau', AnbauSchema);
