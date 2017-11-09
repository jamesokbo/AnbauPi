import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminComponent} from './admin.component';

import { AuthGuardService as AuthGuard } from '../../modules/auth/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from '../../modules/auth/scope-guard.service';

const ADMINROUTES: Routes = [
  {path: 'admin', component:AdminComponent, canActivate: [ScopeGuard], data: { expectedScopes: ['write:messages']} ,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ADMINROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
