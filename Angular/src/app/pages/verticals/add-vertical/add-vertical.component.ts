import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/services/main.service';
import { Resultado } from 'src/app/shared/models/general.model';
import { validarNumeros } from 'src/app/shared/utils/utils.functions';

@Component({
  selector: 'app-add-vertical',
  templateUrl: './add-vertical.component.html',
  styleUrls: ['./add-vertical.component.scss']
})
export class AddVerticalComponent {

  titulo = "Add new demo";
  formDemo = new FormGroup({
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
    private dialogRef: MatDialogRef<AddVerticalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data?.company_id) {
      this.formDemo.patchValue(this.data);
      this.titulo = "Edit demo";
    }
  }

  AddEditEnterpice() {
    if(this.formDemo.invalid) {
      this.toastr.warning('The form is not valid, try again', 'Form not valid');
      return;
    }
    if (this.formDemo.value.company_id) this.EditEnterpice();
    else this.AddEnterpice();
  }

  EditEnterpice = async () => {
    let demo = { ...this.formDemo.value };
    (await this._service.updateDemo(demo)).subscribe((resp: Resultado) => {
      if(resp.success == 'true') {
        this.toastr.success('The demo was updated successfully', 'Success');
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, 'Error');
      }
    });
  };

  AddEnterpice = async () => {
    let demo = { ...this.formDemo.value };
    (await this._service.setDemo(demo)).subscribe((resp: Resultado) => {
      if(resp.success == 'true') {
        this.toastr.success('The demo was updated successfully', 'Success');
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
