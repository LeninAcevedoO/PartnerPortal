import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-modal-demo-details",
  templateUrl: "./modal-demo-details.component.html",
  styleUrls: ["./modal-demo-details.component.scss"],
})
export class ModalDemoDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ModalDemoDetailsComponent>
  ) {}

  getDemoLinkName(demo_type: number){
    switch (demo_type) {
      case 1:
        return "Demo video";
      case 2:
        return "Pitch Deck";
      case 3:
        return "Infosheet";
      case 4:
        return "Demo Link";
      case 5:
        return "Whitepaper";
      default:
        return "Demo";
    }
  }

  getLabelAssetsBox(link_type: number) {
    switch (link_type) {
      case 1:
        return "Image";
      case 2:
        return "Video";
      case 3:
        return "Infosheet";
      case 4:
        return "Demo Live Link";
      case 5:
        return "Whitepaper";
      case 6:
        return "Pitch Deck";
      case 7:
        return "Brochure";
      default:
        return "Demo";
    }
  }

  onNoclick() {
    this.dialogRef.close();
  }
}
