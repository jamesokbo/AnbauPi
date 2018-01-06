import { Injectable } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {HttpClientModule} from '@angular/common/http';

import * as io from 'socket.io-client';

@Injectable()
export class MonitorSocketService {
  socketSubject:ReplaySubject<any>;

  constructor(public auth:AuthService){
    this.socketSubject=new ReplaySubject<any>(1);
    this.init();
  }
  init(){
    let socket=io('http://localhost:8080');
    socket.on('connect',()=>{
      this.auth.getAccessTokenAndProfile((err,data)=>{
        if(err){
          this.socketSubject.error(err);
        }
        socket.emit('authenticate',data,(err,res)=>{
          if(err){
            this.socketSubject.error(err);
          }
          this.socketSubject.next(socket);
        })
      })
    })
  }
  public socketSubscription():Observable<any>{
    return this.socketSubject.asObservable();
  }
}
