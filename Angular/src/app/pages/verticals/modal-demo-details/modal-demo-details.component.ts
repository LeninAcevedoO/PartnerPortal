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

  onNoclick() {
    this.dialogRef.close();
  }
}
