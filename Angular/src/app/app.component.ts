import { Component } from '@angular/core';
import { MainService } from './services/services/main.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Resultant Partner Portal';

  constructor(private router: Router, 
    private _mainService: MainService) 
    {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const usuario = sessionStorage.getItem('usuario');
        const registro = {
          ruta: event.urlAfterRedirects,
          hora: new Date().toISOString(),
          usuario: usuario,
        };

        this._mainService.logRouteVisit(registro);
      }
    });
  }

}
