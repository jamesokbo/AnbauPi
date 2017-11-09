import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';

import {AdminRoutingModule} from './admin-routing.module';

@NgModule ({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  providers: []
})
export class AdminModule {}
