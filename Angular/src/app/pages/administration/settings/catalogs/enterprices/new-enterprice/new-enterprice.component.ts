import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";

@Component({
  selector: "app-new-enterprice",
  templateUrl: "./new-enterprice.component.html",
  styleUrls: ["./new-enterprice.component.scss"],
})
export class NewEnterpriceComponent {
  titulo = "Add new enterprice";
  formEnterprice = new FormGroup({
    enterpice_id: new FormControl<number>(0),
  });

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewEnterpriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data.enterpice_id) {
      this.formEnterprice.patchValue(this.data);
      this.titulo = "Edit enterprice";
    }
  }

  AddEditEnterpice() {
    if (this.formEnterprice.value.enterpice_id) this.EditEnterpice();
    else this.AddEnterpice();
    this.toastr.info('Form submite');
    this.onNoClick();
  }

  EditEnterpice = async () => {
    let enterprice = { ...this.formEnterprice.value };
  };

  AddEnterpice = async () => {
    let enterprice = { ...this.formEnterprice.value };
  };

  onNoClick(resp: boolean = false) {
    this.dialogRef.close(resp);
  }
}
