import { Injectable } from '@angular/core';
import { SocketService } from './socket.service'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class MyFarmsService {
  myFarms:Observable<any[]>;
  farmSubject:ReplaySubject<any>;
  activeFarmSubject:ReplaySubject<any>;
  socketSubscription: Subscription;

  constructor(public socketService: SocketService){
    this.activeFarmSubject=new ReplaySubject<any>(1);
    this.init();
  }

  init(){
    this.farmSubject=new ReplaySubject<any>(1);
  }
  validateFarm(farm):Promise<any>{
    return new Promise((resolve,reject)=>{

    })
  }
  activateFarm(farm){
    this.activeFarmSubject.next(farm);
  }
  getFarms(){
    this.socketSubscription=this.socketService.socketSubscription().subscribe(
    (socket:any)=>{
      socket.emit('getFarms',(err,farms)=>{
        if(err){
          this.farmSubject.error(err);
        }
        this.farmSubject.next(farms);
      })
    },
    error=>{
      this.farmSubject.error(error);
    },
    ()=>{
      console.log("complete")
    })
  }
  newFarm(data):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.socketSubscription=this.socketService.socketSubscription().subscribe(
      (socket:any)=>{
        socket.emit('newFarm',data,(err,res)=>{
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
  public farms():Observable<any>{
    return this.farmSubject.asObservable();
  }
  public activeFarm():Observable<any>{
    return this.activeFarmSubject.asObservable();
  }
}
