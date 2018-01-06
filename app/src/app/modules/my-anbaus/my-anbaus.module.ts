import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyAnbausComponent } from './my-anbaus.component';
import { AnbauListComponent } from './anbau-list/anbau-list.component';
import { AddAnbauComponent } from './add-anbau/add-anbau.component';
import { AnbauComponent } from './anbau/anbau.component';
import { MyAnbausService } from './my-anbaus.service';
import { AnbauService } from './anbau/anbau.service';
import { SocketService } from './socket.service';

//TODO: import { MonitorComponent } from './monitor.component';


import {AnbauRoutingModule} from './my-anbaus-routing.module';

@NgModule ({
  declarations: [
    MyAnbausComponent,
    AnbauListComponent,
    AddAnbauComponent,
    AnbauComponent
    //TODO:MonitorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AnbauRoutingModule
  ],
})
export class MyAnbausModule {}
