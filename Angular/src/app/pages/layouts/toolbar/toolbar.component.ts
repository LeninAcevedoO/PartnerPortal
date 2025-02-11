import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/services/services/context.service';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';  
import { MatDialog } from '@angular/material/dialog'; 
import { NewManagementCommentComponent } from '../../new-management-comment/new-management-comment.component';
import { MainService } from 'src/app/services/services/main.service';

const TREE_DATA: any[] = [
  {
    name: 'Home',
    children: [
      { name: 'Advertisements' }, 
      { name: 'About us' }, 
    ],
  },
  { name: 'AI Assistant' },
  { name: 'Dashboard' },
  { name: 'Services' },
  { name: 'Verticals'},
  { name: 'Favorites' },
  { name: 'Manager Comments' },
  { name: 'Settings'},
  { name: 'Logout'},
];

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  opened = false;
  isAuth = false;
  userRole: number = 0;

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: any) => node.expandable;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _context: ContextService,
    private dialog: MatDialog,
    private _service: MainService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  // ngOnInit() {
  //   localStorage.setItem('email', 'jschmoe@aol.com');
  // }

  ngOnInit() {
    this.userRole = this.getUserRole();
  }

  getUserRole(): number {
    return Number(this._context.theRol());
  }
  

  shouldShowMenuItem(menuItem: string): boolean {
    const role = this.userRole;
  
    const permissions: { [key: string]: number[] } = {
      'AI Assistant': [1, 2, 3],
      'Dashboard': [1, 2],
      'Settings': [1],
      'Manager Comments': [2, 3],
    };
  
    return permissions[menuItem] ? permissions[menuItem].includes(role) : true;
  }

  openModalProfile() {}

  openModalNewComment() {
    const dialogRef = this.dialog.open(NewManagementCommentComponent, {
      width: 'auto',
      disableClose: true,
      panelClass: 'post-dialog-container',
      data: {}, 
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Comentario agregado exitosamente', 'Éxito');
      }
    });
  }
  

  logout() {
    this._context.logout();
    this.toastr.info('Se ha cerrado la sesión', 'Hasta luego');
    this.router.navigate(['/login']);
  }

  navigate(node: any) {
    const routes: { [key: string]: string } = {
      'AI Assistant': '/login',
      Dashboard: '/login',
      Settings: '/settings',
      'About us': '/about-us',
      Advertisements: '/home',
      Favorites: '/favorites',
      Services: '/services',
      Verticals: '/home'
    };

    if (node.name === 'Manager Comments') {
      this.openModalNewComment(); 
      return;
    }

    if (node.name === 'Logout') {
      this.logout(); 
      return;
    }

    const route = routes[node.name];
    if (route) {
      this.router.navigate([route]);
      this.opened = false;
    }
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.classList.add('hover-shadow');
  }

  onMouseLeave(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('hover-shadow');
  }

  getIcon(name: string): string {
    const iconMap: { [key: string]: string } = {
      Home: 'home',
      Advertisements: 'campaign',
      'About us': 'info',
      'AI Assistant': 'support_agent',
      Dashboard: 'dashboard',
      'Manager Comments': 'contact_mail',
      Settings: 'settings',
      Services: 'linked_services',
      Favorites: 'star',
      Verticals: 'vertical_distribute',
      Logout: 'logout',
    };

    return iconMap[name] || 'help';
  }
}
