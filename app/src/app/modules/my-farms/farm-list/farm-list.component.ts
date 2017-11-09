import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyFarmsService } from '../my-farms.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'farm-list',
  template:`
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <li class="col-md-12 col-sm-12 col-xs-12" *ngFor="let farm of farmList" (click)='activateFarm(farm)'>
              <h2 class="">{{farm.name}}</h2>
              <span class="" [hidden]="!farm.status">Connected</span>
              <span class="" [hidden]="farm.status">{{farm.lastConnection | date: 'dd/MM/yyyy @ h:mma'}}</span>
      </li>
    </div>
  `,
  styleUrls:['farm-list.component.css']
})
export class FarmListComponent implements OnInit, OnDestroy {
  farmsSubscription: Subscription;
  farmList: [any];
  @Output() closeForm = new EventEmitter<any>();

  constructor(public farmService: MyFarmsService, public fb:FormBuilder) {}
  ngOnInit() {
    console.log("initiated farm-list component")
    this.farmsSubscription=this.farmService.farms().subscribe((farms)=>{this.farmList=farms});
    this.farmService.getFarms();
  }
  activateFarm(farm){
    this.farmService.activateFarm(farm);
  }
  ngOnDestroy(){}
}
