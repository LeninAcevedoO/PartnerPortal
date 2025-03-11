import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-multimedia-viewer",
  templateUrl: "./multimedia-viewer.component.html",
  styleUrls: ["./multimedia-viewer.component.scss"],
})
export class MultimediaViewerComponent {
  constructor(
    private dialogRef: MatDialogRef<MultimediaViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data)
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
