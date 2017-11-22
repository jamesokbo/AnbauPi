import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyAnbausService } from '../my-anbaus.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'anbau-list',
  template:`
    <div class="anbau-list col-md-12 col-sm-12 col-xs-12" >
      <li class="anbaumin col-md-12 col-sm-12 col-xs-12" [ngClass]="anbau.status" *ngFor="let anbau of anbauList" (click)='activateAnbau(anbau)'>
        <div class="col-md-12 col-sm-12 col-xs-12">
          <h3 class="anbau-name col-md-2 col-sm-2 col-xs-2">{{anbau.name}}</h3>
        </div>
        <div *ngIf="activeAnbau">
          <anbau *ngIf="anbau._id==activeAnbau._id"></anbau>
        </div>
      </li>
    </div>
  `,
  styleUrls:['anbau-list.component.css']
})
export class AnbauListComponent implements OnInit, OnDestroy {
  anbausSubscription: Subscription;
  activeAnbauSubscription:Subscription;
  activeAnbau:{};
  anbauList: [any];
  @Output() closeForm = new EventEmitter<any>();

  constructor(public anbauService: MyAnbausService, public fb:FormBuilder) {
  }
  ngOnInit() {
    console.log("initiated anbau-list component")
    this.anbausSubscription=this.anbauService.anbaus().subscribe((anbaus)=>{
      this.anbauList=anbaus
    });
    this.activeAnbauSubscription=this.anbauService.activeAnbau().subscribe((anbau)=>{this.activeAnbau=anbau});
  }
  activateAnbau(anbau){
    this.anbauService.activateAnbau(anbau);
  }
  ngOnDestroy(){
    this.anbausSubscription.unsubscribe();
    this.activeAnbauSubscription.unsubscribe();
  }
}
