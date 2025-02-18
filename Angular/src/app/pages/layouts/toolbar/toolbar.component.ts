import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/services/services/context.service';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';  // Importa NestedTreeControl para gestionar la expansión de los nodos
import { MatTreeNestedDataSource } from '@angular/material/tree';  // Importa MatTreeNestedDataSource


const TREE_DATA: any[] = [
  {
    name: 'Home',
    children: [
      { name: 'Advertisements' }, 
      { name: 'About us' }, 
    ],
  },
  {name: 'AI Assistant'},
  {name:'Dashboard'},
  {
    name: 'Settings',
    // children:[
    //   {
    //     name: 'Catalogs',
    //     children: [
    //       {name: 'Roles'}, 
    //       {name: 'Companies'}, 
    //       {name: 'Attention status'}
    //     ]
    //   },

    //   {name: 'Users'},
    //   {name: 'Links'},
    //   {name: 'Product details'},
    //   {name: 'Management comments'},
    // ],
    
  },
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


  //#region Mat tree menu

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
  
  //#endregion

  constructor(
    private toatr: ToastrService,
    private router: Router,
    private _context: ContextService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
    localStorage.setItem('email', 'jschmoe@aol.com');
  }

  openModalProfile() {}

  logout() {
    this._context.logout();
    this.toatr.info('Se ha cerrado la sesión', 'Hasta luego');
    this.router.navigate(['/login']);
  }

  navigate(node: any) {
    const routes: { [key: string]: string } = {
      // Home: '/home',
      'AI Assistant': '/login',
      Dashboard: '/login',
      // Roles: '/settings/catalogs/roles',
      // Companies: '/settings/catalogs/companies',
      // 'Attention status': '/settings/catalogs/attention',
      // Users: '/settings/users',
      // Links: '/settings/links',
      // 'Product details': '/settings/product-details',
      // 'Management comments': '/settings/management-comments',
      Settings: '/settings',
    };

    const route = routes[node.name];
    if (route) {
      this.router.navigate([route]);
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
    Settings: 'settings',
  };

  return iconMap[name] || 'help';
}

  
  

}
