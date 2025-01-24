import { ChangeDetectorRef ,Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { NewRolComponent } from "../new-rol/new-rol.component"; 
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent {
buscador = "";
  roles: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getRoles();
  }

  getRoles = async () => {
    (await this._service.getRoles()).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.roles = resp.data;
        this.cdRef.detectChanges();
      } else this.toastr.error(resp.message, "Error");
      console.log(this.roles);
    });
  };

  changeRoleStatus = async (role: any, toStatus: any) => {
    let roleStatus = {
      role_id: role.role_id, 
      status_id: toStatus.checked ? 1 : 0, 
    };
  

    (await this._service.updateRoleStatus(roleStatus)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.getRoles(); 
          this.toastr.success(
            "The role status was changed successfully",
            "Success"
          );
        } else {
          this.toastr.error(resp.message, "Error");
        }
      }
    );
  };
  

  openAddEditRole(data?: any) {
    this.dialog
      .open(NewRolComponent, {
        panelClass: "post-dialog-container",
        data: data,
      })
      .afterClosed()
      .subscribe((x: boolean) => {
        if (x) this.getRoles();
      });
  }
}
