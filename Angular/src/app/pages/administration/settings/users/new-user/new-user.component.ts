import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";
import { validarNumeros } from "src/app/shared/utils/utils.functions";

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"],
})
export class NewUserComponent {
  titulo = "Add system user";
  isShowPsw = false;
  formuser = new FormGroup({
    user_id: new FormControl<number>(0),
    first_name: new FormControl<string>("", Validators.required),
    last_name: new FormControl<string>("", Validators.required),
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    password_hash: new FormControl<string>("", Validators.required),
    phone_number: new FormControl<string>("", Validators.required),
    company_id: new FormControl<string>("", Validators.required),
    role_id: new FormControl<string>("", Validators.required),
    status_id: new FormControl<number>(1),
  });
  cats: any = {
    companies: [],
    roles: [],
  };

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.data?.user_id) {
      this.formuser.patchValue(this.data);
      this.titulo = "Edit user";
    }
    this.getCats();
  }

  getCats = async () => {
    await this.getCatEnterprices();
    await this.getCatRoles();
    this.cdRef.detectChanges();
  };

  getCatEnterprices = async () => {
    (await this._service.getCatEnterprices()).subscribe((resp: Resultado) => {
      if (resp.success == "true") this.cats.companies = resp.data;
      else this.toastr.error(resp.message, "Error");
    });
  };

  getCatRoles = async () => {
    (await this._service.getCatEstatus()).subscribe((resp: Resultado) => {
      if (resp.success == "true") this.cats.roles = resp.data;
      else this.toastr.error(resp.message, "Error");
    });
  };

  AddEditUser() {
    if (this.formuser.invalid) {
      this.toastr.warning("The form is not valid, try again", "Form not valid");
      return;
    }
    if (this.formuser.value.user_id) this.EditUser();
    else this.AddUser();
  }

  EditUser = async () => {
    let user = { ...this.formuser.value };
    (await this._service.updateUser(user)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The user was updated successfully", "Success");
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, "Error");
      }
    });
  };

  AddUser = async () => {
    let link = { ...this.formuser.value };
    (await this._service.setLink(link)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The link was updated successfully", "Success");
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
