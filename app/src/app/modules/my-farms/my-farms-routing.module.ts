import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MyFarmsComponent} from './my-farms.component';

import { AuthGuardService as AuthGuard } from '../../modules/auth/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from '../../modules/auth/scope-guard.service';

const FARMROUTES: Routes = [
  {path: 'my-farms', component:MyFarmsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(FARMROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class FarmRoutingModule { }
