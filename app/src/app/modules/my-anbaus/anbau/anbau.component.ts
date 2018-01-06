import { Component, Input, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyAnbausService } from '../my-anbaus.service';
import { AnbauService } from './anbau.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'anbau',
  template:`
  `,
  styleUrls:['anbau.component.css'],
  providers:[AnbauService]
})
export class AnbauComponent implements OnInit, OnDestroy {
  @Input() anbau: {};
  monitors:[any];

  constructor(public anbausService: MyAnbausService, public anbauService:AnbauService, public fb:FormBuilder) {}
  ngOnInit(){
    this.anbauService.monitors().subscribe((monitors)=>{
      this.monitors=monitors;
    })
  }
  getMonitors(anbau){
    this.anbauService.getMonitors(anbau);
  }
  dectivateAnbau(){
    this.anbausService.activateAnbau({});
  }
  ngOnDestroy(){}
}
