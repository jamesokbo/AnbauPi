import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyAnbausComponent } from './my-anbaus.component';
import { AddAnbauComponent } from './add-anbau/add-anbau.component';
import { MyAnbausService } from './my-anbaus.service';
import { SocketService } from './socket.service';
import { AnbauListComponent } from './anbau-list/anbau-list.component';
//TODO: import { MonitorComponent } from './monitor.component';


import {AnbauRoutingModule} from './my-anbaus-routing.module';

@NgModule ({
  declarations: [
    MyAnbausComponent,
    AnbauListComponent,
    AddAnbauComponent,
    //TODO:AnbauComponent
    //TODO:MonitorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AnbauRoutingModule
  ],
})
export class MyAnbausModule {}
