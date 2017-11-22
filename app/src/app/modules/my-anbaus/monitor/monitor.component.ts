import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyAnbausService } from '../my-anbaus.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'anbau',
  template:`
    <h3>{{anbau._id}}</h3>
  `,
  styleUrls:['anbau.component.css']
})
export class AnbauComponent implements OnInit, OnDestroy {
  anbau: [any];
  anbauSubscription: Subscription;

  constructor(public anbauService: MyAnbausService, public fb:FormBuilder) {}
  ngOnInit() {
    console.log("initiated anbau component")
    this.anbauSubscription=this.anbauService.activeAnbau().subscribe((anbau)=>{
      this.anbau=anbau;
      //TODO: request monitors associated with this
    });
  }
  dectivateAnbau(){
    this.anbauService.activateAnbau({});
  }
  ngOnDestroy(){}
}
