import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MyAnbausComponent} from './my-anbaus.component';

import { AuthGuardService as AuthGuard } from '../../modules/auth/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from '../../modules/auth/scope-guard.service';

const FARMROUTES: Routes = [
  {path: 'my-anbaus', component:MyAnbausComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(FARMROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AnbauRoutingModule { }
