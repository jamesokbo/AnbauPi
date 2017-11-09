var mongoose=require('mongoose');
var errors=require('../../errors');
var Farm=require('../../models/farm');
var Sensor=require('../../models/sensor');
var Monitor=require('../../models/monitor');
var connectedFarms=require('../../socketHandlers/connectedFarms');

validateFarm=(data)=>{
  return new Promise((resolve,reject)=>{
    Farm.find({_id:mongoose.Types.ObjectId(data.farmId), userId:mongoose.Types.ObjectId(socket.profile.sub)},(err,monitor)=>{
      if(err){
        reject(err)
      }
      if(monitor){
        resolve(monitor)
      }
      else{
        reject(errors.s015)
      }
    })
  })
}
validateSensor=(data)=>{
  return new Promise((resolve,reject)=>{
    Sensor.find({farmId:data.monitorId,type:data.type},(err,sensor)=>{
      if(sensor){
        resolve(sensor);
      }
      reject(errors.s017);
    })
  })
}

module.exports=function(socket){
  socket.on('newSensor',(data,cb)=>{
    validateMonitor(data).then((monitor)=>{
      validateSensor(data).then((sensor)=>{
        cb(errors.s016);
      }).catch((error)=>{
        connectedFarms.getFarm(data).then((farmSocket)=>{
          farmSocket.emit('newSensor',data,(err,res)=>{
            if(err){
              cb(err)
            }
            else{
              //TODO: check that the sensor type is valid and asign 'nameIcon' and default 'unit'
              var newSensor=new Sensor({monitorId:data.monitorId, type:data.type});
              newSensor.save();
              cb(res)
            }
          })
        })
      })
    }).catch((error)=>{cb(error)})
  })
  socket.on('mReading',(data,cb)=>{
    validateMonitor(data).then((monitor)=>{
      validateSensor(data).then((sensor)=>{
        connectedFarms.getFarm(data).then((farmSocket)=>{
          farmSocket.emit('mReading',data,(err,reading)=>{
            if(err){
              cb(err);
            }
            else{
              Sensor.update({_id:sensor._id},{$set:{reading:reading}},(err,res)=>{
                if(err){
                  cb(err);
                }
                cb(reading);
              })
            }
          })
        })
      }).catch((error)=>{cb(error)});
    }).catch((error)=>{cb(error)});
  })
}
