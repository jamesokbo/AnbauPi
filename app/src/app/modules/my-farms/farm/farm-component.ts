import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyFarmsService } from '../my-farms.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'farm',
  template:`
  `, //TODO: add farm template
  styleUrls:['farm.component.css']
})
export class FarmComponent implements OnInit, OnDestroy {
  farm: [any];
  farmSubscription: Subscription;

  constructor(public farmService: MyFarmsService, public fb:FormBuilder) {}
  ngOnInit() {
    console.log("initiated farm-list component")
    this.farmSubscription=this.farmService.activeFarm().subscribe((farm)=>{
      this.farm=farm;
      //TODO: request monitors associated with this 
    });
  }
  dectivateFarm(){
    this.farmService.activateFarm({});
  }
  ngOnDestroy(){}
}
