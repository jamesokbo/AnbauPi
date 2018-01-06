import { Component, Input, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnbauService } from '../anbau.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'monitor-list',
  template:`
    <div class="row col-md-12 col-sm-12 col-xs-12" >
      <li class="monitor-list col-md-12 col-sm-12 col-xs-12" [ngClass]="monitor.status" *ngFor="let monitor of monitorList">
        <div class="monitor-min col-md-12 col-sm-12 col-xs-12" [ngClass]="{active: monitor._id==activeMonitor._id, connected:monitor.status}"
        (click)='toggleMonitor(monitor)'>
          <h4 class="monitor-name col-md-2 col-sm-2 col-xs-2">{{monitor.name}}</h4>
        </div>
      </li>
    </div>
  `,
  styleUrls:['anbau-list.component.css']
})
export class AnbauListComponent implements OnInit, OnDestroy {
  @Input() monitorList: [any];
  @Input() activeMonitor: any = {_id:0}

  constructor(public anbauService: AnbauService, public fb:FormBuilder) {
  }
  ngOnInit() {
    console.log("initiated monitor-list component")
  }
  toggleMonitor(monitor){
    if(monitor._id==this.activeMonitor._id){
      this.anbauService.deactivateMonitor();
    }
    else{
      this.anbauService.activateMonitor(monitor);
    }
  }
  ngOnDestroy(){
  }
}
