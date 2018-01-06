import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AnbauService {
  serverSocketPromise:Promise<any>;
  monitorsSubject:ReplaySubject<any>;
  activeMonitorSubject:ReplaySubject<any>;

  constructor(public socketService: SocketService){
    this.init();
  }

  init(){
    this.monitorsSubject=new ReplaySubject<any>(1);
    this.activeMonitorSubject=new ReplaySubject<any>(1);
    this.serverSocketPromise=new Promise<any>((resolve,reject)=>{
      this.socketService.socketSubscription().subscribe(
      (socket:any)=>{
        resolve(socket);
      })
    })
  }
  public getMonitors(anbau){
    this.serverSocketPromise.then((socket)=>{
      socket.emit("getMonitors",anbau,(err,monitors)=>{
        if(err){
          console.log(err);
        }
        this.monitorsSubject.next(monitors);
      })
    })
  }
  public monitors():Observable<any>{
      return this.monitorsSubject.asObservable();
  }
  public activateMonitor(monitor){
    this.activeMonitorSubject.next(monitor);
  }
  public deactivateMonitor(){
    this.activeMonitorSubject.next({_id:0});
  }
}
