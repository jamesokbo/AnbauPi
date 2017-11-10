import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { NgUploaderModule } from 'ngx-uploader';

import { AdminModule } from './modules/admin/admin.module';
import { MyAnbausModule } from './modules/my-anbaus/my-anbaus.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';

import { AuthService } from './modules/auth/auth.service';
import { CallbackComponent } from './modules/callback/callback.component';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ProfileComponent } from './modules/profile/profile.component';
import { AuthGuardService } from './modules/auth/auth-guard.service';
import { ScopeGuardService } from './modules/auth/scope-guard.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    MyAnbausModule,
    NgUploaderModule,
    AppRoutingModule //always last because of wildcard route
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ScopeGuardService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
