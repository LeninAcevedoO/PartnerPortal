import { ChangeDetectorRef, Component, Inject } from "@angular/core";
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
  titulo = "Add system role";
  isShowPsw = false;
  formrole = new FormGroup({
    role_id: new FormControl<number>(0),
    role_name: new FormControl<string>("", Validators.required),
    description: new FormControl<string>("", Validators.required),
  });

  cats: any = {
    companies: [],
  };

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.data?.role_id) {
      this.formrole.patchValue(this.data);
      this.titulo = "Edit role";
    }
    this.getCats();
  }

  getCats = async () => {
    this.cdRef.detectChanges();
  };

  AddEditRole() {
    if (this.formrole.invalid) {
      this.toastr.warning("The form is not valid, try again", "Form not valid");
      return;
    }
    if (this.formrole.value.role_id) this.EditRole();
    else this.AddRole();
  }

  AddRole = async () => {
    let role = {
      ...this.formrole.value,
    };
  
    (await this._service.setRole(role)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The role was added successfully", "Success");
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, "Error");
      }
    });
  };
  
  EditRole = async () => {
    let role = {
      ...this.formrole.value,
    };
  
    (await this._service.updateRole(role)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The role was updated successfully", "Success");
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
}
