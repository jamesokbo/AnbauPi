var connectedMonitors=require("./connectedMonitors");
var mongoose = require("mongoose");
var errors= require("../errors")
var Monitor=require("../models/monitor");

var authenticateMonitor = function(socket){
  return new Promise((resolve,reject)=>{
    socket.on("authenticate",(data,cb)=>{
      //TODO: think of a better way to authenticate the monitor
      Monitor.find({_id:mongoose.Types.ObjectId(data.id)},(err,monitor)=>{
        if(err){
          reject(err);
        }
        if(monitor){
          socket.id=monitor._id;
          resolve(monitor)
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
  authenticateMonitor(socket).then(()=>{
    socket.auth=true;
    socket.date=Date.now();
    connectedMonitors.connectMonitor(socket).then(()=>{
      Monitor.update({_id:socket.id},{$set:{status:true,lastConnection:socket.date}},(err,res)=>{
        if(err){
          throw(err);
        }
        require('../services/monitorService')(socket);
      })
    })

    socket.on("disconnect",()=>{
      connectedMonitors.disconnectMonitor(socket).then(()=>{
        Monitor.update({_id:socket.id, lastConnection:socket.date},{$set:{status:false}},(err,res)=>{
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
