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
  
    ngOnInit = async () => {
      await this.getRoles();
    };
  
    getRoles = async () => {
      (await this._service.getRoles()).subscribe((resp: Resultado) => {
        if (resp.success == "true") this.roles = resp.data;
        else this.toastr.error(resp.message, "Error");
      });
    };
  
    changeRolStatus = async (rol: any, toStatus: any) => {
      console.log(toStatus)
      let rolStatus = {
        rol_id: rol.id,
        status: Number(toStatus),
      };
      this.toastr.info('status: '+ toStatus);
  
      (await this._service.updateEnterpriceStatus(rolStatus)).subscribe(
        (resp: Resultado) => {
          if (resp.success == "true") {
            this.roles = resp.data;
            this.toastr.success(
              "The rol status was changed successfully",
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
          if (x == true) this.getRoles();
        });
    }
}
