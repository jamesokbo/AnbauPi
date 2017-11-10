var connectedFarms=require("./connectedFarms");
var mongoose = require("mongoose");
var errors= require("../errors")
var Farm=require("../models/farm");

var authenticateFarm = function(socket){
  return new Promise((resolve,reject)=>{
    socket.on("authenticate",(data,cb)=>{
      //TODO: think of a better way to authenticate the farm
      Farm.find({_id:mongoose.Types.ObjectId(data.id), status:false},(err,farm)=>{
        if(err){
          reject(err);
        }
        if(farm){
          socket.id=farm._id;
          resolve(farm)
        }
        else{
          reject(errors.s013);
        }
      })
    })
  })
}

module.exports=function(socket){
  socket.auth=false;
  authenticateFarm(socket).then(()=>{
    socket.auth=true;
    socket.date=Date.now();
    connectedFarms.connectFarm(socket).then(()=>{
      Farm.update({_id:socket.id},{$set:{status:true,lastConnection:socket.date}},(err,res)=>{
        if(err){
          throw(err);
        }
        //TODO: pass the authenticated farm socket to farm services
        require('../services/farmService')(socket);
        require('../services/monitorService')(socket);
      })
    })

    socket.on("disconnect",()=>{
      connectedFarms.disconnectFarm(socket).then(()=>{
        Farm.update({_id:socket.id, lastConnection:socket.date},{$set:{status:false}},(err,res)=>{
          if(err){
            throw(err);
          }
        })
      });
    })
  })
  .catch(err=>{
    console.log(err);
  });
  setTimeout(()=>{
    if(!socket.auth){
      socket.emit('unauthorized');
      socket.disconnect();
    }
  },2000);
}
