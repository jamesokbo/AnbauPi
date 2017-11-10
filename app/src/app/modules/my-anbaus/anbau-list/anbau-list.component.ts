import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyAnbausService } from '../my-anbaus.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'anbau-list',
  template:`
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <li class="col-md-12 col-sm-12 col-xs-12" *ngFor="let anbau of anbauList" (click)='activateAnbau(anbau)'>
              <h2 class="">{{anbau.name}}</h2>
              <span class="" [hidden]="!anbau.status">Connected</span>
              <span class="" [hidden]="anbau.status">{{anbau.lastConnection | date: 'dd/MM/yyyy @ h:mma'}}</span>
      </li>
    </div>
  `,
  styleUrls:['anbau-list.component.css']
})
export class AnbauListComponent implements OnInit, OnDestroy {
  anbausSubscription: Subscription;
  anbauList: [any];
  @Output() closeForm = new EventEmitter<any>();

  constructor(public anbauService: MyAnbausService, public fb:FormBuilder) {}
  ngOnInit() {
    console.log("initiated anbau-list component")
    this.anbausSubscription=this.anbauService.anbaus().subscribe((anbaus)=>{this.anbauList=anbaus});
    this.anbauService.getAnbaus();
  }
  activateAnbau(anbau){
    this.anbauService.activateAnbau(anbau);
  }
  ngOnDestroy(){
    this.anbausSubscription.unsubscribe();
  }
}
