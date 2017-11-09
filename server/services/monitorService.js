var mongoose=require('mongoose');
var errors=require('../errors');
var Farm=require('../models/farm');
var Monitor=require('../models/monitor')


module.exports=function(socket){
    //TODO: Monitor triggered events
    socket.on("newMonitor",(data,cb)=>{
      Farm.find({_id:mongoose.Types.ObjectId(socket.id)},(err,farm)=>{
        if(err){
          cb(err)
        }
        if(farm.userId!=""){
          var monitor=new Monitor({
            userId:farm.userId,
            farmId:farm._id,
          })
          monitor.save((err,mon)=>{
            if(err){
              cb(err);
            }
            cb(null,mon);
          })
        }
        else{
          cb(errors.s014)
        }
      })
    })
    socket.on("monitorIdentification",(data,cb)=>{
      Monitor.find({_id:mongoose.Types.ObjectId(data._id),farmId:mongoose.Types.ObjectId(socket.id)},(err,monitor)=>{
        if(err){
          cb(err)
        }
        if(monitor){
          cb(null, true)
        }
        else{
          cb(errors.s015)
        }
      })
    })
    socket.on("reading",(data,cb)=>{
      
    })
}
