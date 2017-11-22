import { Injectable } from '@angular/core';
import { SocketService } from './socket.service'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class MyAnbausService {
  anbauSubject:ReplaySubject<any>;
  activeAnbauSubject:ReplaySubject<any>;
  serverSocketPromise:Promise<any>;

  constructor(public socketService: SocketService){
    this.activeAnbauSubject=new ReplaySubject<any>(1);
    this.init();
  }

  init(){
    this.anbauSubject=new ReplaySubject<any>(1);
    this.serverSocketPromise=new Promise<any>((resolve,reject)=>{
      this.socketService.socketSubscription().subscribe(
      (socket:any)=>{
        resolve(socket);
      })
    })

  }
  activateAnbau(anbau){
    this.activeAnbauSubject.next(anbau);
  }
  getAnbaus(){
    this.serverSocketPromise.then((socket)=>{
      socket.emit('getAnbaus',(err,anbaus)=>{
        if(err){
          this.anbauSubject.error(err);
        }
        this.anbauSubject.next(anbaus);
      });
    })
  }
  newAnbau(data):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.serverSocketPromise.then((socket)=>{
        socket.emit('newAnbau',data,(err,res)=>{
          if(err){
            reject(err)
          }
          resolve(res);
        });
      })
    });
  }
  public anbaus():Observable<any>{
    return this.anbauSubject.asObservable();
  }
  public activeAnbau():Observable<any>{
    return this.activeAnbauSubject.asObservable();
  }
}
