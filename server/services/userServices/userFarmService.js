var mongoose=require('mongoose');
var errors=require('../../errors');
var Farm=require('../../models/farm');
var Sensor=require('../../models/sensor');
var Monitor=require('../../models/monitor');

module.exports=function(socket){
  socket.on('getFarms',(cb)=>{
    Farm.find({userId:socket.profile.sub},(err,farms)=>{
      if(err){
        cb(err);
      }
      cb(null,farms);
    });
  });
  socket.on('newFarm',(data,cb)=>{
    Farm.update({_id:mongoose.Types.ObjectId(data.id), userId:""},{$set:{name:data.name, userId:socket.profile.sub}},(err,res)=>{
      if(err){
        cb(err);
      }
      if(res.ok==1 && res.modified==1){
        cb(null,{status:true});
      }else{
        cb(errors.s004);
      }
    })
  })
  socket.on('deleteFarm',(data,cb)=>{
    Farm.update({_id:mongoose.Types.ObjectId(data.farmId), userId:socket.profile.sub},{$set:{name:"", userId:""}},(err,res)=>{
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
  socket.on('editFarm',(data,cb)=>{
    Farm.update({_id:mongoose.Types.ObjectId(data.farmId), userId:socket.profile.sub},{$set:data.set},(err,res)=>{
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
