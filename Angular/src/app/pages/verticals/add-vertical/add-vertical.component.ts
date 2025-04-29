import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { MultimediaViewerComponent } from "src/app/shared/components/multimedia-viewer/multimedia-viewer.component";
import { Resultado } from "src/app/shared/models/general.model";
import {
  convertBase64ToWebP,
  getMimeTypeFromBase64,
  getMultimediaType,
  validarNumeros,
} from "src/app/shared/utils/utils.functions";

@Component({
  selector: "app-add-vertical",
  templateUrl: "./add-vertical.component.html",
  styleUrls: ["./add-vertical.component.scss"],
})
export class AddVerticalComponent {
  titulo = "Add new demo";
  formDemo = new FormGroup({
    demo_id: new FormControl<number>(0),
    demo_name: new FormControl<string>("", Validators.required),
    description: new FormControl<string>("", Validators.required),
    information: new FormControl<string>("", [Validators.required]),
    release_date: new FormControl<string>("", Validators.required),
    vertical_id: new FormControl<string>("", Validators.required),
    miniature: new FormControl<any>(""),
    fileName: new FormControl<string>(""),
    isMainCarusel: new FormControl<boolean>(false),
    multimedia_type_id: new FormControl<number>(0),
    mimeType: new FormControl<string>(""),
    poster_url: new FormControl<string>(""),
  });
  today = new Date();
  cats: any = {
    verticals: [
      { id: 1, description: "Education" },
      { id: 2, description: "Human/Health Services" },
      { id: 3, description: "Workforce Development " },
      { id: 4, description: "DOC & Criminal Justice" },
      { id: 5, description: "Public Sector Solutions" },
      { id: 7, description: "Private Sector Solutions" },
      { id: 6, description: "Others" },
    ],
  };

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddVerticalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.data?.demo_id) {
      this.formDemo.patchValue({...this.data, miniature: this.data.multimedia_link});
      this.titulo = "Edit demo";
    }
  }

  AddEditVertical() {
    if (this.formDemo.invalid) {
      this.toastr.warning("The form is not valid, try again", "Form not valid");
      return;
    }
    if (this.formDemo.value.demo_id) this.EditVertical();
    else this.AddVertical();
  }

  EditVertical = async () => {
    let demo = { ...this.formDemo.value };
    (await this._service.updateDemo(demo)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The demo was updated successfully", "Success");
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, "Error");
      }
    });
  };

  AddVertical = async () => {
    const mimeT = this.formDemo.value.mimeType;
    const mt_id = getMultimediaType(mimeT || "");
    console.log(mt_id);
    if (mimeT?.includes("image") && !mimeT?.includes("gif") && mt_id == 1) {
      this.formDemo.patchValue({
        miniature: convertBase64ToWebP(
          this.formDemo.value.miniature || "",
          0.8
        ),
      });
    }
    let demo = {
      ...this.formDemo.value,
      release_date: moment(this.formDemo.value.release_date).format(
        "YYYY-MM-DD"
      ),
      multimedia_type_id: mt_id,
      mimeType: mimeT,
      fileName: this.formDemo.value.demo_name,
    };
    (await this._service.setDemo(demo)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The demo was updated successfully", "Success");
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, "Error");
      }
    });
  };

  validateNumbers(value: any, e: any) {
    return validarNumeros(e, value);
  }

  onNoClick(resp: boolean = false) {
    this.dialogRef.close(resp);
  }

  onFileSelected(e: any) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formDemo.patchValue({
          miniature: String(reader.result),
          fileName: file.name,
          mimeType: file.type // <- aquí se agrega el MIME type
        });
      };
    }
  }
  

  openVisualizer() {
    const info = {
      mimeType: "img",
      multimedia_type_id: this.formDemo.value.multimedia_type_id,
      b64: this.formDemo.value.miniature,
    };
    this.dialog.open(MultimediaViewerComponent, {
      panelClass: "post-dialog-container",
      data: info,
    });
  }
}
