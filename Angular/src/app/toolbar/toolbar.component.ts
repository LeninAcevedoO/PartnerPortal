import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from "@angular/material/tree";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ContextService } from "src/app/services/services/context.service";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatDialog } from "@angular/material/dialog";
import { MainService } from "src/app/services/services/main.service";
import { NewManagementCommentComponent } from "../pages/new-management-comment/new-management-comment.component";

const TREE_DATA: any[] = [
  {
    name: "Home",
    icon: "home",
    permissions: [1, 2, 3, 4],
    onClick: "/",
    children: [
      {
        name: "Advertisements",
        onClick: "/home",
        icon: "campaign",
        permissions: [1, 2, 3, 4],
      },
      // {
      //   name: "About us",
      //   onClick: "/about-us",
      //   icon: "info",
      //   permissions: [1, 2, 3, 4],
      // },
    ],
  },
  // {
  //   name: "Favorites",
  //   onClick: "/favorites",
  //   icon: "star",
  //   permissions: [1, 2, 3, 4],
  // },
  // {
  //   name: "AI Assistant",
  //   permissions: [1, 2, 3],
  //   onClick: "/login",
  //   icon: "support_agent",
  // },
  {
    name: "Verticals",
    onClick: "/verticals",
    icon: "vertical_distribute",
    permissions: [1, 2, 3, 4],
  },
  // { name: 'Services' },
  // {
  //   name: "Manager Comments",
  //   permissions: [1, 2, 3, 4],
  //   onClick: "openModalNewComment",
  //   icon: "contact_mail",
  // },
  {
    name: "Dashboard",
    permissions: [1, 2],
    onClick: "/login",
    icon: "dashboard",
  },
  {
    name: "Settings",
    permissions: [1],
    onClick: "/settings",
    icon: "settings",
  },
  // {
  //   name: "Logout",
  //   onClick: "Logout",
  //   icon: "logout",
  //   permissions: [1, 2, 3, 4],
  // },
];

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
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
      icon: node.icon,
      onClick: node.onClick,
      permissions: node.permissions,
    };
  };

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
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

  ngOnInit() {
    this.userRole = this.getUserRole();
    // this.filterMenuItems();
  }

  getUserRole(): number {
    return Number(this._context.theRol());
  }

  // filterMenuItems() {
  //   this.dataSource.data = TREE_DATA.filter(item => item.permissions.includes(this.userRole));
  //   //this.shouldShowMenuItem(item.name));
  // }

  // shouldShowMenuItem(menuItem: string): boolean {
  //   const role = this.userRole;

  //   const permissions: { [key: string]: number[] } = {
  //     'AI Assistant': [1, 2, 3],
  //     'Dashboard': [1, 2],
  //     'Settings': [1],
  //     'Manager Comments': [1, 2, 3, 4],
  //   };

  //   return permissions[menuItem] ? permissions[menuItem].includes(role) : true;
  // }

  openModalProfile() {}

  openModalNewComment() {
    this.dialog
      .open(NewManagementCommentComponent, {
        panelClass: "post-dialog-container",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.toastr.success("Comment added successfully", "Success");
        }
      });
  }

  logout() {
    this._context.logout();
    this.toastr.info("The session has been closed", "Bye");
    this.router.navigate(["/login"]);
  }

  actionClick(node: any) {
    // const routes: { [key: string]: string } = {
    //   'AI Assistant': '/login',
    //   Dashboard: '/login',
    //   Settings: '/settings',
    //   'About us': '/about-us',
    //   Advertisements: '/home',
    //   Favorites: '/favorites',
    //   Services: '/services',
    //   Verticals: '/verticals'
    // };
    if (node.onClick.length > 2) {
      switch (node.onClick) {
        case "openModalNewComment":
          this.openModalNewComment();
          break;
        case "Logout":
          this.logout();
          break;
        default:
          this.router.navigate([node.onClick]);
          this.opened = false;
          break;
      }
    }
    // if (node.name === 'Manager Comments') {
    //   this.openModalNewComment();
    //   return;
    // }

    // if (node.name === 'Logout') {
    //   this.logout();
    //   return;
    // }

    // const route = routes[node.name];
    // if (route) {
    //   this.router.navigate([route]);
    //   this.opened = false;
    // }
  }

  // onMouseOver(event: MouseEvent): void {
  //   const target = event.currentTarget as HTMLElement;
  //   target.classList.add('hover-shadow');
  // }

  // onMouseLeave(event: MouseEvent): void {
  //   const target = event.currentTarget as HTMLElement;
  //   target.classList.remove('hover-shadow');
  // }

  // getIcon(name: string): string {
  //   const iconMap: { [key: string]: string } = {
  //     Home: 'home',
  //     Advertisements: 'campaign',
  //     'About us': 'info',
  //     'AI Assistant': 'support_agent',
  //     Dashboard: 'dashboard',
  //     'Manager Comments': 'contact_mail',
  //     Settings: 'settings',
  //     Services: 'linked_services',
  //     Favorites: 'star',
  //     Verticals: 'vertical_distribute',
  //     Logout: 'logout',
  //   };

  //   return iconMap[name] || 'help';
  // }
}
