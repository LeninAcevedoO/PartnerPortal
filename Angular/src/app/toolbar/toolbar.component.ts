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
    ],
  },
  {
    name: "Verticals",
    onClick: "/verticals",
    icon: "vertical_distribute",
    permissions: [1, 2, 3, 4],
  },
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
  }

  getUserRole(): number {
    return Number(this._context.theRol());
  }

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
  }
}
