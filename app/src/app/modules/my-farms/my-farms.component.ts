import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyFarmsService } from './my-farms.service';
import { SocketService } from './socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-farms',
  template: `
  <div class="row">
    <div class="col-md-3 col-md-offset-5 addNewMainRPi" *ngIf="!addFarm && !activeFarm">
        <button type="button" class="btn btn-info btn-add" (click)="openForm()">Add Farm!</button>
    </div>
    <add-farm *ngIf="addFarm && !activeFarm" (closeForm)="closeForm($event)"></add-farm>
    <farm-list *ngIf="!activeFarm"></farm-list>
    <!-- <farm *ngIf="activeFarm"></farm>TODO: farm.component-->
  </div>
  `,
  providers: [
    MyFarmsService,
    SocketService
  ]
})
export class MyFarmsComponent implements OnInit, OnDestroy {
  farmsSubscription: Subscription;
  activeFarmSubscription: Subscription;
  addFarm: boolean;
  activeFarm: {};

  constructor(public farmService: MyFarmsService) { }
  ngOnInit() {
    this.addFarm=false;
    this.activeFarmSubscription=this.farmService.activeFarm().subscribe((farm)=>{this.activeFarm=farm});
  }
  ngOnDestroy(){
    this.farmsSubscription.unsubscribe();
  }
  closeForm(event:boolean){
    this.addFarm=false;
  }
  openForm(){
    this.addFarm=true;
  }
}
