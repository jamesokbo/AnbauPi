module.exports={
    //Array containing a socket for each user connected to the server
    sockets:[],
    //Array containing the IDs of each user connected to the server, following the same order as the 'sockets' array
    ids:[],

    connectUser:(socket)=>{
      return new Promise((resolve,reject)=>{
        this.sockets.push(socket);
        this.ids.push(socket.profile.sub);
        resolve();
      })
    }
    disconnectUser:(socket)=>{
      return new Promise((resolve,reject)=>{
        var userIndex=this.ids.indexOf(socket.profile.sub);
        this.sockets.splice(userIndex,1);
        this.ids.splice(userIndex,1);
      })
    }
    emitToUser:()
};
