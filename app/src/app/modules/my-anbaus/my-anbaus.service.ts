import { Injectable } from '@angular/core';
import { SocketService } from './socket.service'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class MyAnbausService {
  myAnbaus:Observable<any[]>;
  anbauSubject:ReplaySubject<any>;
  activeAnbauSubject:ReplaySubject<any>;
  socketSubscription: Subscription;

  constructor(public socketService: SocketService){
    this.activeAnbauSubject=new ReplaySubject<any>(1);
    this.init();
  }

  init(){
    this.anbauSubject=new ReplaySubject<any>(1);
  }
  validateAnbau(anbau):Promise<any>{
    return new Promise((resolve,reject)=>{

    })
  }
  activateAnbau(anbau){
    this.activeAnbauSubject.next(anbau);
  }
  getAnbaus(){
    this.socketSubscription=this.socketService.socketSubscription().subscribe(
    (socket:any)=>{
      socket.emit('getAnbaus',(err,anbaus)=>{
        if(err){
          this.anbauSubject.error(err);
        }
        this.anbauSubject.next(anbaus);
      })
    },
    error=>{
      this.anbauSubject.error(error);
    },
    ()=>{
      console.log("complete")
    })
  }
  newAnbau(data):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.socketSubscription=this.socketService.socketSubscription().subscribe(
      (socket:any)=>{
        socket.emit('newAnbau',data,(err,res)=>{
          if(err){
            reject(err);
            this.socketSubscription.unsubscribe();
          }
          resolve(res);
          this.socketSubscription.unsubscribe();
        })
      }, error=>{
        reject(error);
        this.socketSubscription.unsubscribe();
      }, ()=>{
      })
    })
  }
  public anbaus():Observable<any>{
    return this.anbauSubject.asObservable();
  }
  public activeAnbau():Observable<any>{
    return this.activeAnbauSubject.asObservable();
  }
}
