var errors=require('../errors');

module.exports={
    //Array containing a socket for each monitor connected to the server
    sockets:[],
    //Array containing the IDs of each monitor connected to the server, following the same order as the 'sockets' array
    ids:[],

    connectMonitor:(socket)=>{
      return new Promise((resolve,reject)=>{
        this.sockets.push(socket);
        this.ids.push(socket.id);
        resolve();
      })
    }
    disconnectMonitor:(socket)=>{
      return new Promise((resolve,reject)=>{
        var farmIndex=this.ids.indexOf(socket.id);
        if(farmIndex!=-1){
          this.sockets.splice(farmIndex,1);
          this.ids.splice(farmIndex,1);
          resolve();

        }
        else{
          reject();
        }
      })
    }
    getMonitor:(farmId)=>{
      return new Promise((resolve,reject)=>{
        var farmIndex=this.ids.indexOf(socket.id);
        if(farmIndex!=-1){
          resolve(sockets[farmIndex]);
        }
        else{
          reject(errors.s008);
        }
      })
    }
};
