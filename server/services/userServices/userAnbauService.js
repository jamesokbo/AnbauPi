var mongoose=require('mongoose');
var errors=require('../../errors');
var Anbau=require('../../models/monitor');


module.exports=function(socket){
  socket.on('newAnbau',(data,cb)=>{
    data.userId=socket.profile.sub;
    var anbau=new Anbau(data);
    anbau.save((err,res)=>{
      if(err){
        cb(err)
      }
      else{
        cb(null,{status:true});
      }
    })
  })
  socket.on('editAnbau',(data,cb)=>{
    var id=mongoose.Types.ObjectId(data._id);
    delete data._id;
    Anbau.update({_id:id, userId:socket.profile.sub},{$set:data},(err,res)=>{
      if(err){
        cb(err);
      }
      else if(res.nModified>0){
        cb(null,{status:true})
      }
      else{
        cb(null,{status:false})
      }
    })
  })
  socket.on('deleteAnbau',(data,cb)=>{
    //TODO: we have to release the associated monitors first. Should we delete all their previously gathered data?
  })

  socket.on('getAnbaus',(data,cb)=>{
    Anbau.find({userId:socket.profile.sub},(err,anbaus)=>{
      if(err){
        cb(err)
      }
      else{
        cb(null,anbaus);
      }
    })
  });
}
