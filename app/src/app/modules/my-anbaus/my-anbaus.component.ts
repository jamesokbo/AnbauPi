import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyAnbausService } from './my-anbaus.service';
import { SocketService } from './socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-anbaus',
  template: `
  <div class="row">
    <div class="col-md-3 col-md-offset-5 addNewMainRPi" *ngIf="!addAnbau && !activeAnbau">
        <button type="button" class="btn btn-info btn-add" (click)="openForm()">Add Anbau!</button>
    </div>
    <add-anbau *ngIf="addAnbau && !activeAnbau" (closeForm)="closeForm($event)"></add-anbau>
    <anbau-list *ngIf="!activeAnbau"></anbau-list>
    <!-- <anbau *ngIf="activeAnbau"></anbau>TODO: anbau.component-->
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

  constructor(public anbauService: MyAnbausService) { }
  ngOnInit() {
    this.addAnbau=false;
    this.activeAnbauSubscription=this.anbauService.activeAnbau().subscribe((anbau)=>{this.activeAnbau=anbau});
  }
  ngOnDestroy(){
    this.activeAnbauSubscription.unsubscribe();
  }
  closeForm(event:boolean){
    this.addAnbau=false;
  }
  openForm(){
    this.addAnbau=true;
  }
}
