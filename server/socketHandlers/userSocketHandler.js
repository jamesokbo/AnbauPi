var jwks = require('jwks-rsa');
var socketioJwt   = require("socketio-jwt");
var jwt = require("jsonwebtoken");
var connectedUsers=require("./connectedUsers");

var authenticateSocket = function(socket){
  return new Promise((resolve,reject)=>{
    socket.on("authenticate",(data,cb)=>{
      var decodedJwt = jwt.decode(data.token, {complete:true});
      if(decodedJwt){
        const kid=decodedJwt.header.kid;
        const client = jwks({
          cache: true,
          cacheMaxEntries: 5, // Default value
          cacheMaxAge: 36000000, // Default value
          jwksUri: 'https://jokhuysen.auth0.com/.well-known/jwks.json'
        });
        client.getSigningKey(kid, (err,key)=>{
          if(err){
            cb(err)
          }
          jwt.verify(data.token, key.publicKey,
            {algorithms:'RS256',
            audience:'https://anbaupi-api.com'
            },(err,decodedToken)=>{
              if(err){
                cb(err)
              }
              else{
                cb(null,data.profile)
                socket.profile=data.profile;
                resolve();
              }
          });
        })
      }
    })
  })
}

module.exports=function(socket){
  socket.auth=false;
  authenticateSocket(socket).then(()=>{
    socket.auth=true;
    connectedUsers.connectUser(socket).then(()=>{
      //TODO: pass the authenticated user socket to all user services
      require('../services/userServices/userFarmService')(socket);
    })

    socket.on("disconnect",()=>{
      connectUser.disconnectUser(socket).then(()=>{})
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
