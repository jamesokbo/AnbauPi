var errors=require('../errors');

module.exports={
    //Array containing a socket for each monitor connected to the server
    sockets:[],
    //Array containing the IDs of each monitor connected to the server, following the same order as the 'sockets' array
    ids:[],

    connectMonitor:(socket)=>{
      return new Promise((resolve,reject)=>{
        var monitorIndex=this.ids.indexOf(socket.id);
        if(monitorIndex!=-1){
          this.sockets.splice(monitorIndex,1);
          this.ids.splice(monitorIndex,1);
        }
        this.sockets.push(socket);
        this.ids.push(socket.id);
        resolve();
      })
    }
    disconnectMonitor:(socket)=>{
      return new Promise((resolve,reject)=>{
        var monitorIndex=this.ids.indexOf(socket.id);
        if(monitorIndex!=-1){
          this.sockets.splice(monitorIndex,1);
          this.ids.splice(monitorIndex,1);
          resolve();

        }
        else{
          reject();
        }
      })
    }
    getMonitor:(monitorId)=>{
      return new Promise((resolve,reject)=>{
        var monitorIndex=this.ids.indexOf(socket.id);
        if(monitorIndex!=-1){
          resolve(sockets[monitorIndex]);
        }
        else{
          reject(errors.s008);
        }
      })
    }
};
