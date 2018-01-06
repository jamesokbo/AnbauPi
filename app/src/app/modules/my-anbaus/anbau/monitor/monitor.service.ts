import { Injectable } from '@angular/core';
import { MonitorSocketService } from './monitor-socket.service'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class MonitorService {
  monitorSocketPromise:Promise<any>;

  constructor(public socketService: MonitorSocketService){
    this.init();
  }

  init(){
    this.monitorSocketPromise=new Promise<any>((resolve,reject)=>{
      this.socketService.socketSubscription().subscribe(
      (socket:any)=>{
        resolve(socket);
      })
    })
  }
}
