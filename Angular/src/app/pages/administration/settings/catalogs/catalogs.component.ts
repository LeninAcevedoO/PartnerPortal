import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent {

  options = [
    {title: 'Roles', icon: 'badge', route: '/settings/roles', badge: 0},
    {title: 'Companies', icon: 'apartment', route: '/settings/companies', badge: 0},
    {title: 'Attention status', icon: 'play_lesson', route: '/settings/attention', badge: 0},
  ];

  constructor(private router: Router) { }

  navigate(route: any) {
    this.router.navigate([route]);
  }
}
