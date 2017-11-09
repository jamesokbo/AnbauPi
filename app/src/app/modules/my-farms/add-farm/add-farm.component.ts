import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyFarmsService } from '../my-farms.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'add-farm',
  templateUrl:'add-farm.component.html',
  styleUrls:['add-farm.component.css']
})
export class AddFarmComponent implements OnInit, OnDestroy {
  farmForm:FormGroup;
  submitted:false;
  farm:{};

  @Output() closeForm = new EventEmitter<any>();

  constructor(public farmService: MyFarmsService, public fb:FormBuilder) {}
  ngOnInit() {
    console.log("initiated add-farm component")
    this.farm={};
  }
  ngOnDestroy(){}

  newFarm(){
    this.farmService.newFarm(this.farm).then(()=>{
      this.closeFarmForm();
    }).catch(error=>{
      console.log(error)
    })
  }
  closeFarmForm(){
    this.closeForm.emit(true);
  }
}
