var errors=require('../errors');

module.exports={
    //Array containing a socket for each farm connected to the server
    sockets:[],
    //Array containing the IDs of each farm connected to the server, following the same order as the 'sockets' array
    ids:[],

    connectFarm:(socket)=>{
      return new Promise((resolve,reject)=>{
        this.sockets.push(socket);
        this.ids.push(socket.id);
        resolve();
      })
    }
    disconnectFarm:(socket)=>{
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
    getFarm:(farmId)=>{
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
