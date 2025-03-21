import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-multimedia-viewer",
  templateUrl: "./multimedia-viewer.component.html",
  styleUrls: ["./multimedia-viewer.component.scss"],
})
export class MultimediaViewerComponent {

  zoom = 1;
  
  constructor(
    private dialogRef: MatDialogRef<MultimediaViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  zoomIn() {
    this.zoom += 0.1;
  }

  zoomOut() {
    if (this.zoom > 0.5) {
      this.zoom -= 0.1;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
