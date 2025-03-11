import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  options = [
    {title: 'Catalogs', icon: 'menu_book', route: '/settings/catalogs', badge: 0},
    {title: 'Users', icon: 'groups', route: '/settings/users', badge: 0},
    {title: 'Links', icon: 'link', route: '/settings/links', badge: 0},
    {title: 'Product details', icon: 'inbox_text', route: '/settings/product-details', badge: 0},
    {title: 'Manager comments', icon: 'report', route: '/settings/management-comments', badge: 0},
  ];

  catsOptions = [
    {title: 'Roles', icon: 'badge', route: '/settings/catalogs/roles', badge: 0},
    {title: 'Companies', icon: 'apartment', route: '/settings/catalogs/companies', badge: 0},
    {title: 'Attention status', icon: 'play_lesson', route: '/settings/catalogs/attention', badge: 0},
  ];

  isCat = false;

  constructor(private router: Router) { }

  navigate(route: any) {
    if (route === '/settings/catalogs') {
      this.isCat = true;
    } else 
      this.router.navigate([route]);
  }

}
