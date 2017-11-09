import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
      <h2>Bienvenido administrador</h2>
      <div class="inner-outlet">
        <router-outlet></router-outlet>
      </div>
  `,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
