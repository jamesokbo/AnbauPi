//TODO: rewrite in Promises, not callbacks

import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  userProfile: any;
  requestedScopes: string = 'openid profile';

  auth0 = new auth0.WebAuth({
    clientID: 'xGPn0SGrz9pQRRm2OZjvFD45xu0pt8X7',
    domain: 'jokhuysen.auth0.com',
    responseType: 'id_token token',
    redirectUri: 'http://localhost:4200/callback',
    audience: 'https://anbaupi-api.com',
    scope: this.requestedScopes
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }
  public getAccessTokenAndProfile(cb):void{
    this.getAccessToken((err,accessToken)=>{
      if(err){
        cb(err)
      }
      this.getProfile((err,profile)=>{
        if(err){
          cb(err)
        }else{
          cb(null,{token:accessToken, profile:profile})
        }
      })
    })
  }
  public getAccessTokenAndIdToken(cb):void{
    this.getAccessToken((err,accessToken)=>{
      if(err){
        cb(err)
      }
      this.getIdToken((err,idToken)=>{
        if(err){
          cb(err)
        }else{
          cb(null,{accessToken:accessToken, idToken:idToken})
        }
      })
    })
  }
  public getAccessToken(cb):void{
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      cb(Error('Access token does not exist'))
    } else{
      cb(null,accessToken)
    }
  }
  public getIdToken(cb):void{
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      cb(Error('Access token does not exist'))
    } else{
      cb(null,idToken)
    }
  }
  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }
  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));

  }
  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    // Go back to the home route
    this.router.navigate(['/']);
  }
  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}
