import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { NewMediaLinksComponent } from "../new-media-links/new-media-links.component";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: 'app-media-links-list',
  templateUrl: './media-links-list.component.html',
  styleUrls: ['./media-links-list.component.scss']
})
export class MediaLinksListComponent {
buscador = "";
  links: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getLinks();
  }

  getLinks = async () => {
    (await this._service.getLinks()).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.links = resp.data;
        this.cdRef.detectChanges();
      } else this.toastr.error(resp.message, "Error");
      console.log(this.links);
    });
  };

  changeLinkStatus = async (link: any, toStatus: any) => {
    let linkStatus = {
      link_id: link.link_id, 
      status_id: toStatus.checked ? 1 : 0, 
    };
  

    (await this._service.updateLinkStatus(linkStatus)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.getLinks(); 
          this.toastr.success(
            "The link status was changed successfully",
            "Success"
          );
        } else {
          this.toastr.error(resp.message, "Error");
        }
      }
    );
  };
  

  openAddEditLink(data?: any) {
    this.dialog
      .open(NewMediaLinksComponent, {
        panelClass: "post-dialog-container",
        data: data,
      })
      .afterClosed()
      .subscribe((x: boolean) => {
        if (x) this.getLinks();
      });
  }
}
