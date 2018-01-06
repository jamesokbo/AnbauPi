import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyAnbausService } from './my-anbaus.service';
import { SocketService } from './socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-anbaus',
  template: `
  <div class="row">
    <div class="col-md-3 col-md-offset-5 addNewMainRPi" *ngIf="!addAnbau">
        <button type="button" class="btn btn-info btn-add" (click)="openForm()">Add Anbau!</button>
    </div>
    <add-anbau *ngIf="addAnbau" (closeForm)="closeForm($event)"></add-anbau>
    <anbau-list [anbauList]="anbauList"></anbau-list>
  </div>
  `,
  providers: [
    MyAnbausService,
    SocketService
  ]
})
export class MyAnbausComponent implements OnInit, OnDestroy {
  anbausSubscription: Subscription;
  activeAnbauSubscription: Subscription;
  addAnbau: boolean;
  activeAnbau: {};
  anbauList:[any];

  constructor(public anbauService: MyAnbausService) {}
  ngOnInit() {
    this.addAnbau=false;
    this.activeAnbauSubscription=this.anbauService.activeAnbau().subscribe((anbau)=>{this.activeAnbau=anbau});
    this.anbausSubscription=this.anbauService.anbaus().subscribe((anbaus)=>{
      this.anbauList=anbaus
    });
    this.anbauService.getAnbaus()
  }
  ngOnDestroy(){
    this.activeAnbauSubscription.unsubscribe();
    this.anbausSubscription.unsubscribe();
  }
  closeForm(event:boolean){
    this.addAnbau=false;
  }
  openForm(){
    this.addAnbau=true;
  }
}
