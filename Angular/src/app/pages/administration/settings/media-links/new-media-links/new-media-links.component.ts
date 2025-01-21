import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";
import { validarNumeros } from "src/app/shared/utils/utils.functions";

@Component({
  selector: 'app-new-media-links',
  templateUrl: './new-media-links.component.html',
  styleUrls: ['./new-media-links.component.scss']
})
export class NewMediaLinksComponent {
  titulo = "Add system link";
  isShowPsw = false;
  formuser = new FormGroup({
    link_id: new FormControl<number>(0),
    description: new FormControl<string>("", Validators.required),
  });


  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewMediaLinksComponent>,
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
    this.cdRef.detectChanges();
  };


  AddEditUser() {
    if (this.formuser.invalid) {
      this.toastr.warning("The form is not valid, try again", "Form not valid");
      return;
    }
    if (this.formuser.value.link_id) this.EditUser();
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
    let user = { ...this.formuser.value };
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
