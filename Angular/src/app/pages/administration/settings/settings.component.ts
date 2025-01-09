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
    {title: 'Management comments', icon: 'report', route: '/settings/management-comments', badge: 0},
  ];

  constructor(private router: Router) { }

  navigate(route: any) {
    this.router.navigate([route]);
  }

}
