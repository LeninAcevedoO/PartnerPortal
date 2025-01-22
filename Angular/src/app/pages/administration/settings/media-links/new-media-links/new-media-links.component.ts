import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";
import { validarNumeros } from "src/app/shared/utils/utils.functions";
import * as moment from 'moment';

@Component({
  selector: 'app-new-media-links',
  templateUrl: './new-media-links.component.html',
  styleUrls: ['./new-media-links.component.scss']
})
export class NewMediaLinksComponent {
  titulo = "Add system link";
  isShowPsw = false;
  formlink = new FormGroup({
    link_id: new FormControl<number>(0),
    link_url: new FormControl<string>("", Validators.required),
    description: new FormControl<string>("", Validators.required),
    expiration_date: new FormControl<Date | null>(null, Validators.required),
  });

  cats: any = {
    companies: [],
  };

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NewMediaLinksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.data?.link_id) {
      this.formlink.patchValue(this.data);
      this.titulo = "Edit link";
    }
    this.getCats();
  }

  getCats = async () => {
    await this.getCatEnterprices();
    this.cdRef.detectChanges();
  };

  getCatEnterprices = async () => {
    (await this._service.getCatEnterprices()).subscribe((resp: Resultado) => {
      if (resp.success == "true") this.cats.companies = resp.data;
      else this.toastr.error(resp.message, "Error");
    });
  };



  AddEditLink() {
    if (this.formlink.invalid) {
      this.toastr.warning("The form is not valid, try again", "Form not valid");
      return;
    }
    if (this.formlink.value.link_id) this.EditLink();
    else this.AddLink();
  }

  AddLink = async () => {
    let link = {
      ...this.formlink.value,
      expiration_date: moment(this.formlink.value.expiration_date).format('YYYY-MM-DD') 
    };
  
    (await this._service.setLink(link)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.toastr.success("The link was added successfully", "Success");
        this.onNoClick(true);
      } else {
        this.toastr.error(resp.message, "Error");
      }
    });
  };
  
  EditLink = async () => {
    let link = {
      ...this.formlink.value,
      expiration_date: moment(this.formlink.value.expiration_date).format('YYYY-MM-DD') 
    };
  
    (await this._service.updateLink(link)).subscribe((resp: Resultado) => {
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