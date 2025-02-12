import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/services/main.service';
import { Resultado } from 'src/app/shared/models/general.model';
import { validarNumeros } from 'src/app/shared/utils/utils.functions';

@Component({
  selector: 'app-status-new-atendant',
  templateUrl: './status-new-atendant.component.html',
  styleUrls: ['./status-new-atendant.component.scss']
})
export class StatusNewAtendantComponent {

  titulo = "Add new attention";
  formAttention = new FormGroup({
    attention_status_id: new FormControl<number>(0),
    attention_status_name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    charging_order: new FormControl<number>(1,  Validators.required),
    color: new FormControl<string>('#004986',  Validators.required),
  });
  catsAttentionStatus: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<StatusNewAtendantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data?.attention_status_id) {
      this.formAttention.patchValue(this.data);
      this.titulo = "Edit attention";
    }
    this.getCatAttentionStatus();
  }
  
  async getCatAttentionStatus() {
    (await this._service.getCatAtendant()).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.catsAttentionStatus = resp.data;
      } else this.toastr.error(resp.message, "Error");
    });
  }

  AddEditAttention() {
    if(this.formAttention.invalid) {
      this.toastr.warning('The form is not valid, try again', 'Form not valid');
      return;
    }
    if (Number(this.formAttention.value.charging_order) <= 0) {
      this.toastr.warning('The order must be greater than 0', 'Order not valid');
      return;
    }
    if (this.formAttention.value.attention_status_id) this.EditAttention();
    else this.AddAttention();
  }

  EditAttention = async () => {
    let attention = { ...this.formAttention.value };
    (await this._service.updateAttentionStatus(attention)).subscribe((resp: Resultado) => {
      if(resp.success == 'true') {
        this.toastr.success('The attention was updated successfully', 'Success');
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, 'Error');
      }
    });
  };

  AddAttention = async () => {
    let attention = { ...this.formAttention.value };
    (await this._service.setAttentionStatus(attention)).subscribe((resp: Resultado) => {
      if(resp.success == 'true') {
        this.toastr.success('The attention was updated successfully', 'Success');
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, 'Error');
      }
    });
  };

  validarNumeros(value: any, event: any) {
    return validarNumeros(value, event);
  }

  onNoClick(resp: boolean = false) {
    this.dialogRef.close(resp);
  }
}
