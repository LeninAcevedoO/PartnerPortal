import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/services/main.service';
import { Resultado } from 'src/app/shared/models/general.model';
import { AddVerticalComponent } from '../add-vertical/add-vertical.component';

@Component({
  selector: 'app-verticals-list',
  templateUrl: './verticals-list.component.html',
  styleUrls: ['./verticals-list.component.scss']
})
export class VerticalsListComponent {
buscador = "";
  Verticals: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getdemos();
  }

  async getdemos() {
    (await this._service.getDemos('all')).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.Verticals = resp.data;
        this.cdRef.detectChanges();
      } else this.toastr.error(resp.message, "Error");
    });
  }

  changedemoStatus = async (demo: any, toStatus: any) => {
    let verticalStatus = {
      company_id: demo.company_id,
      status_id: [0, 2].includes(toStatus)
        ? toStatus
        : Number(toStatus.checked),
    };

    (await this._service.updateDemoStatus(verticalStatus)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.getdemos();
          this.toastr.success(
            "The demo status was changed successfully",
            "Success"
          );
        } else this.toastr.error(resp.message, "Error");
      }
    );
  };

  openAddEditdemo(data?: any) {
    this.dialog
      .open(AddVerticalComponent, {
        panelClass: "post-dialog-container",
        data: data,
      })
      .afterClosed()
      .subscribe((x: boolean) => {
        if (x) this.getdemos();
      });
  }
}
