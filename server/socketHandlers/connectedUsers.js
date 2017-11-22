//Array containing a socket for each user connected to the server
sockets=[];
//Array containing the IDs of each user connected to the server, following the same order as the 'sockets' array
ids=[];

module.exports={
  connectUser:(socket)=>{
    return new Promise((resolve,reject)=>{
      var userIndex=ids.indexOf(socket.profile.sub);
      if(userIndex!=-1){
        sockets.splice(userIndex,1);
        ids.splice(userIndex,1);
      }
      sockets.push(socket);
      ids.push(socket.profile.sub);
      resolve();
    })
  },
  disconnectUser:(socket)=>{
    return new Promise((resolve,reject)=>{
      var userIndex=ids.indexOf(socket.profile.sub);
      if(userIndex!=-1){
        sockets.splice(userIndex,1);
        ids.splice(userIndex,1);
      }
      resolve();
    })
  }
};
