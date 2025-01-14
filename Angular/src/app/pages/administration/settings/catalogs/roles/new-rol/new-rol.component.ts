import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";
import { validarNumeros } from "src/app/shared/utils/utils.functions";


@Component({
  selector: 'app-new-rol',
  templateUrl: './new-rol.component.html',
  styleUrls: ['./new-rol.component.scss']
})
export class NewRolComponent {
  titulo = "Add new rol";
  formRol = new FormGroup({
    rol_id: new FormControl<number>(0),
    rol_name: new FormControl<string>('', Validators.required),
    rol_description: new FormControl<string>('', Validators.required),
  });

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data?.rol_id) {
      this.formRol.patchValue(this.data);
      this.titulo = "Edit rol";
    }
  }

  AddEditRol() {
    if(this.formRol.invalid) {
      this.toastr.warning('The form is not valid, try again', 'Form not valid');
      return;
    }
    if (this.formRol.value.rol_id) this.EditRol();
    else this.AddRol();
  }

  EditRol = async () => {
    let rol = { ...this.formRol.value };
    (await this._service.updateRol(rol)).subscribe((resp: Resultado) => {
      if(resp.success == 'true') {
        this.toastr.success('The rol was updated successfully', 'Success');
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, 'Error');
      }
    });
  };

  AddRol = async () => {
    let rol = { ...this.formRol.value };
    (await this._service.setRol(rol)).subscribe((resp: Resultado) => {
      if(resp.success == 'true') {
        this.toastr.success('The rol was updated successfully', 'Success');
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
