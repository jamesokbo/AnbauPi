import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyFarmsComponent } from './my-farms.component';
import { AddFarmComponent } from './add-farm/add-farm.component';
import { MyFarmsService } from './my-farms.service';
import { SocketService } from './socket.service';
import { FarmListComponent } from './farm-list/farm-list.component';
//TODO: import { MonitorComponent } from './monitor.component';


import {FarmRoutingModule} from './my-farms-routing.module';

@NgModule ({
  declarations: [
    MyFarmsComponent,
    FarmListComponent,
    AddFarmComponent,
    //TODO:FarmComponent
    //TODO:MonitorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FarmRoutingModule
  ],
})
export class MyFarmsModule {}
