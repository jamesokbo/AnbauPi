var mongoose=require('mongoose');
var errors=require('../../errors');
var Monitor=require('../../models/monitor');
var Sensor=require('../../models/sensor');

module.exports=function(socket){
  socket.on('getMonitors',(data,cb)=>{
    Monitor.find({anbauId:data.anbauId, userId:socket.profile.sub},(err,monitors)=>{
      if(err){
        cb(err);
      }
      cb(null,monitors);
    });
  });
  socket.on('newMonitor',(data,cb)=>{
    Monitor.update({_id:mongoose.Types.ObjectId(data.id), anbauId:"", userId:""},
    {$set:{name:data.name, anbauId:data.anbauId, userId:socket.profile.sub}},(err,res)=>{
      if(err){
        cb(err);
      }
      if(res.ok==1 && res.modified==1){
        cb(null,{status:true});
      }
      else{
        cb(errors.s004);
      }
    })
  })
  socket.on('deleteMonitor',(data,cb)=>{
    Monitor.update({_id:mongoose.Types.ObjectId(data.farmId), anbauId:data.anbauId, userId:socket.profile.sub},
    {$set:{name:"", anbauId:"", userId:""}},(err,res)=>{
      if(err){
        cb(err);
      }
      if(res.ok==1 && res.modified==1){
        cb(null,{status:true});
      }else{
        cb(errors.s001);
      }
    })
  })
  socket.on('editMonitor',(data,cb)=>{
    var id = mongoose.Types.ObjectId(data._id);
    delete data._id;
    Monitor.update({_id:id, anbauId:data.anbauId, userId:socket.profile.sub},{$set:data},(err,res)=>{
      if(err){
        cb(err);
      }
      if(res.ok==1 && res.modified==1){
        cb(null,{status:true});
      }else{
        cb(errors.s001);
      }
    })
  })
}
