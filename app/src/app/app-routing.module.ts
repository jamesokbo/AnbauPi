import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router }  from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AdminComponent } from './modules/admin/admin.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { CallbackComponent } from './modules/callback/callback.component';
import { AuthGuardService as AuthGuard } from './modules/auth/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from './modules/auth/scope-guard.service';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
