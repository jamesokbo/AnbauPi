import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyAnbausService } from '../my-anbaus.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'add-anbau',
  templateUrl:'add-anbau.component.html',
  styleUrls:['add-anbau.component.css']
})
export class AddAnbauComponent implements OnInit, OnDestroy {
  anbauForm:FormGroup;
  submitted:false;
  anbau:{};

  @Output() closeForm = new EventEmitter<any>();

  constructor(public anbauService: MyAnbausService, public fb:FormBuilder) {}
  ngOnInit() {
    console.log("initiated add-anbau component")
    this.anbau={};
  }
  ngOnDestroy(){}

  newAnbau(){
    this.anbauService.newAnbaus(this.anbau).then(()=>{
      this.closeAnbausForm();
    }).catch(error=>{
      console.log(error)
    })
  }
  closeAnbausForm(){
    this.closeForm.emit(true);
  }
}
