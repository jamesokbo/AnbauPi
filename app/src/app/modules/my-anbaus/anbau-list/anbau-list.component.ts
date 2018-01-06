import { Component, Input, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyAnbausService } from '../my-anbaus.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'anbau-list',
  template:`
    <div class="anbau-list col-md-12 col-sm-12 col-xs-12" >
      <li class="anbaumin col-md-12 col-sm-12 col-xs-12" [ngClass]="anbau.status" *ngFor="let anbau of anbauList" (click)='activateAnbau(anbau)'>
        <div class="row col-md-12 col-sm-12 col-xs-12">
          <h3 class="anbau-name col-md-2 col-sm-2 col-xs-2">{{anbau.name}}</h3>
        </div>
        <div class="row" *ngIf="activeAnbau">
          <anbau *ngIf="anbau._id==activeAnbau._id" [anbau]="activeAnbau"></anbau>
        </div>
      </li>
    </div>
  `,
  styleUrls:['anbau-list.component.css']
})
export class AnbauListComponent implements OnInit, OnDestroy {
  activeAnbauSubscription:Subscription;
  activeAnbau:{};
  @Input() anbauList: [any];
  @Output() closeForm = new EventEmitter<any>();

  constructor(public anbauService: MyAnbausService, public fb:FormBuilder) {
  }
  ngOnInit() {
    console.log("initiated anbau-list component")
    this.activeAnbauSubscription=this.anbauService.activeAnbau().subscribe((anbau)=>{this.activeAnbau=anbau});
  }
  activateAnbau(anbau){
    this.anbauService.activateAnbau(anbau);
  }
  ngOnDestroy(){
    this.activeAnbauSubscription.unsubscribe();
  }
}
