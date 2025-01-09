import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/services/services/context.service';
import { NestedTreeControl } from '@angular/cdk/tree';  // Importa NestedTreeControl para gestionar la expansión de los nodos
import { MatTreeNestedDataSource } from '@angular/material/tree';  // Importa MatTreeNestedDataSource

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
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

  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  childrenAccessor = (node: FoodNode) => node.children ?? [];
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

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


}
