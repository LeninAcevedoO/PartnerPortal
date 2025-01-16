import { Component } from "@angular/core";
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
      private dialog: MatDialog
    ) {}
    
  
    ngOnInit(){
      this.getRoles();
    }
  
    getRoles() {
      this._service.getRoles().subscribe((resp: Resultado) => {
        if (resp.success == "true") this.roles = resp.data;
        else this.toastr.error(resp.message, "Error");
      });
    };
  

    changeRolStatus = async (rol: any, toStatus: any) => {
      let rolStatus = {
        rol_id: rol.rol_id,
        status_id: [0,2].includes(toStatus) ? toStatus : Number(toStatus.checked),
      };
  
      (await this._service.updateRoleStatus(rolStatus)).subscribe(
        (resp: Resultado) => {
          if (resp.success == "true") {
            this.getRoles();
            this.toastr.success(
              "The enterprice status was changed successfully",
              "Success"
            );
          } else this.toastr.error(resp.message, "Error");
        }
      );
    };
  
  openAddEditRol(data?: any) {
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
