import { ChangeDetectorRef, Component } from '@angular/core';
import { StatusNewAtendantComponent } from '../status-new-atendant/status-new-atendant.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/services/main.service';
import { Resultado } from 'src/app/shared/models/general.model';
import { invertHexColor } from 'src/app/shared/utils/utils.functions';

@Component({
  selector: 'app-status-atendant-list',
  templateUrl: './status-atendant-list.component.html',
  styleUrls: ['./status-atendant-list.component.scss']
})
export class StatusAtendantListComponent {
buscador = "";
  attentions: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAttentions();
  }

  getAttentions = async () => {
    (await this._service.getAllAttentionStatus()).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        let attColored = resp.data;
        attColored.forEach((x: any) => {
          this.attentions.push({...x, invCol: this.invertirColor(x.color)})
        });
        this.cdRef.detectChanges();
      } else this.toastr.error(resp.message, "Error");
    });
  }

  changeEnterpriceStatus = async (enterprice: any, toStatus: any) => {
    let enterpiceStatus = {
      attention_status_id: enterprice.attention_status_id,
      status_id: [0, 2].includes(toStatus)
        ? toStatus
        : Number(toStatus.checked),
    };

    (await this._service.updateAttentionStatusStatus(enterpiceStatus)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.getAttentions();
          this.toastr.success(
            "The enterprice status was changed successfully",
            "Success"
          );
        } else this.toastr.error(resp.message, "Error");
      }
    );
  };

  openAddEditAttentionStatus(data?: any) {
    this.dialog
      .open(StatusNewAtendantComponent, {
        panelClass: "post-dialog-container",
        data: data,
      })
      .afterClosed()
      .subscribe((x: boolean) => {
        if (x) this.getAttentions();
      });
  }

  invertirColor(colorHex: string): string {
    return invertHexColor(colorHex);
  }
}
