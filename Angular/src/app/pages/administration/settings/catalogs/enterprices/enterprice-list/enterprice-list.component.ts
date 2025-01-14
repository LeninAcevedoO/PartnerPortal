import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { NewEnterpriceComponent } from "../new-enterprice/new-enterprice.component";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: "app-enterprice-list",
  templateUrl: "./enterprice-list.component.html",
  styleUrls: ["./enterprice-list.component.scss"],
})
export class EnterpriceListComponent {
  buscador = "";
  enterprices: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(){
    this.getEnterprices();
  };

  getEnterprices = async () => {
    (await this._service.getEnterprices()).subscribe((resp: Resultado) => {
      if (resp.success == "true") this.enterprices = resp.data;
      else this.toastr.error(resp.message, "Error");
    });
  };

  changeEnterpriceStatus = async (enterprice: any, toStatus: any) => {
    console.log(toStatus)
    let enterpiceStatus = {
      company_id: enterprice.company_id,
      status: Number(toStatus),
    };
    this.toastr.info('status: '+ toStatus);

    (await this._service.updateEnterpriceStatus(enterpiceStatus)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.enterprices = resp.data;
          this.toastr.success(
            "The enterprice status was changed successfully",
            "Success"
          );
        } else this.toastr.error(resp.message, "Error");
      }
    );
  };

  openAddEditEnterprice(data?: any) {
    this.dialog
      .open(NewEnterpriceComponent, {
        panelClass: "post-dialog-container",
        data: data,
      })
      .afterClosed()
      .subscribe((x: boolean) => {
        if (x == true) this.getEnterprices();
      });
  }
}
