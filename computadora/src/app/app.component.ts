import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Computadora', url: '/computadora-list', icon: 'list-sharp' },
    
  ];

  constructor() {}
}
