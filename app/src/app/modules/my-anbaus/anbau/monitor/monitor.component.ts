import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonitorSocketService } from './monitor-socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'monitor',
  template:`
  `,
  styleUrls:['monitor.component.css']
})
export class MonitorComponent implements OnInit, OnDestroy {
  
  constructor() {}
  ngOnInit() {
  }
  dectivateAnbau(){
  }
  ngOnDestroy(){}
}
