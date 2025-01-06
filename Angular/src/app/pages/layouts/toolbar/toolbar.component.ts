import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/services/services/context.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  opened = false;
  isAuth = false;

  constructor(private toatr: ToastrService,
    private router: Router,
    private _context: ContextService) { }

  ngOnInit() {
    localStorage.setItem('email', 'jschmoe@aol.com');
  }

  openModalProfile() {

  }

  logout() {
    this._context.logout();
    this.toatr.info('Se ha cerrado la sesión', 'Hasta luego');
    this.router.navigate(['/login']);
  }
}
