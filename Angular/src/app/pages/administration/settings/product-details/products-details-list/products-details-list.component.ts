import { ChangeDetectorRef, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { NewProductsDetailsComponent } from "src/app/pages/new-products-details/new-products-details.component";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: "app-products-details-list",
  templateUrl: "./products-details-list.component.html",
  styleUrls: ["./products-details-list.component.scss"],
})
export class ProductsDetailsListComponent {
  
  buscador = "";
  requests: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getProductDetails();
  }

  async getProductDetails() {
    (await this._service.getProductDetails()).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.requests = resp.data;
        this.cdRef.detectChanges();
      } else this.toastr.error(resp.message, "Error");
    });
  }

  changeEnterpriceStatus = async (enterprice: any, toStatus: any) => {
    let enterpiceStatus = {
      company_id: enterprice.company_id,
      status_id: [0, 2].includes(toStatus)
        ? toStatus
        : Number(toStatus.checked),
    };

    (await this._service.updateEnterpriceStatus(enterpiceStatus)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.getProductDetails();
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
      .open(NewProductsDetailsComponent, {
        panelClass: "post-dialog-container",
        data: data,
      })
      .afterClosed()
      .subscribe((x: boolean) => {
        if (x) this.getProductDetails();
      });
  }
}
