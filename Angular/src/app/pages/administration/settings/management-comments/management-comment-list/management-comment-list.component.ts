import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NewManagementCommentComponent } from 'src/app/pages/new-management-comment/new-management-comment.component';
import { MainService } from 'src/app/services/services/main.service';
import { Resultado } from 'src/app/shared/models/general.model';
import { getWhiteBlackColor } from 'src/app/shared/utils/utils.functions';

@Component({
  selector: 'app-management-comment-list',
  templateUrl: './management-comment-list.component.html',
  styleUrls: ['./management-comment-list.component.scss']
})
export class ManagementCommentListComponent {

  buscador = "";
  comments: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getManagerComments();
  }

  async getManagerComments() {
    (await this._service.getManagerComments()).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.comments = resp.data;
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
          this.getManagerComments();
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
      .open(NewManagementCommentComponent, {
        panelClass: "post-dialog-container",
        data: data,
      })
      .afterClosed()
      .subscribe((x: boolean) => {
        if (x) this.getManagerComments();
      });
  }

  getWhiteBlackColor(colorHex: string) {
    return getWhiteBlackColor(colorHex);
  }
}
