import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ContextService } from "src/app/services/services/context.service";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";
import { validarNumeros } from "src/app/shared/utils/utils.functions";
import { UtilsService } from "src/app/shared/utils/utils.service";

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"],
})
export class NewUserComponent {
  titulo = "User register";
  isShowPsw = false;
  formuser = new FormGroup({
    user_id: new FormControl<number>(0),
    first_name: new FormControl<string>("", Validators.required),
    last_name: new FormControl<string>("", Validators.required),
    email: new FormControl<string>("", [Validators.required, Validators.email]),
    password_hash: new FormControl<string>("", Validators.required),
    phone_number: new FormControl<string>("", Validators.required),
    company_id: new FormControl<string>("", Validators.required),
    role_id: new FormControl<number>(1, Validators.required),
    status_id: new FormControl<number>(2),
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
    private cdRef: ChangeDetectorRef,
    private _utilsSvc: UtilsService,
    private _context: ContextService
  ) {}

  ngOnInit() {
    if (this.data?.user_id) {
      this.getUser();
      this.titulo = "Edit user";
    }
    this.getCats();
  }

  getUser = async () => {
    (await this._service.getUser(this.data.user_id)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") this.formuser.patchValue(resp.data[0]);
        else this.toastr.error(resp.message, "Error");
      }
    );
  };

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
    (await this._service.getCatRoles()).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.cats.roles = resp.data;
        this.formuser.patchValue({ role_id: this.cats.roles[0].role_id });
      } else this.toastr.error(resp.message, "Error");
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
    let user = {
      ...this.formuser.value,
      password_hash: this._utilsSvc.encryptAES(
        String(this.formuser.value.password_hash)
      ),
    };
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
    let user = {
      ...this.formuser.value,
      password_hash: this._utilsSvc.encryptAES(
        String(this.formuser.value.password_hash)
      ),
      isAnonnymous: this._context.isAuth(),
    };
    (await this._service.setUser(user)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The user was updated successfully", "Success");
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
