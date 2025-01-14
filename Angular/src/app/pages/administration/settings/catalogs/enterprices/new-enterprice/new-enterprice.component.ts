import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";
import { validarNumeros } from "src/app/shared/utils/utils.functions";

@Component({
  selector: "app-new-enterprice",
  templateUrl: "./new-enterprice.component.html",
  styleUrls: ["./new-enterprice.component.scss"],
})
export class NewEnterpriceComponent {
  titulo = "Add new enterprice";
  formEnterprice = new FormGroup({
    company_id: new FormControl<number>(0),
    company_name: new FormControl<string>('', Validators.required),
    legal_name: new FormControl<string>('', Validators.required),
    company_email: new FormControl<string>('',  [Validators.required, Validators.email]),
    phone_number: new FormControl<string>('', Validators.required),
    address: new FormControl<string>('', Validators.required),
  });

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewEnterpriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data?.company_id) {
      this.formEnterprice.patchValue(this.data);
      this.titulo = "Edit enterprice";
    }
  }

  AddEditEnterpice() {
    if(this.formEnterprice.invalid) {
      this.toastr.warning('The form is not valid, try again', 'Form not valid');
      return;
    }
    if (this.formEnterprice.value.company_id) this.EditEnterpice();
    else this.AddEnterpice();
  }

  EditEnterpice = async () => {
    let enterprice = { ...this.formEnterprice.value };
    (await this._service.updateEnterprice(enterprice)).subscribe((resp: Resultado) => {
      if(resp.success == 'true') {
        this.toastr.success('The enterprice was updated successfully', 'Success');
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, 'Error');
      }
    });
  };

  AddEnterpice = async () => {
    let enterprice = { ...this.formEnterprice.value };
    (await this._service.setEnterprice(enterprice)).subscribe((resp: Resultado) => {
      if(resp.success == 'true') {
        this.toastr.success('The enterprice was updated successfully', 'Success');
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, 'Error');
      }
    });
  };

  validateNumbers(value: any, e: any) {
    return validarNumeros(e, value);
  }

  onNoClick(resp: boolean = false) {
    this.dialogRef.close(resp);
  }
}
