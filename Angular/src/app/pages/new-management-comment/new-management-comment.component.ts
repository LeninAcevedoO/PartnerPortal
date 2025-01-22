import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/services/main.service';
import { Resultado } from 'src/app/shared/models/general.model';

@Component({
  selector: 'app-new-management-comment',
  templateUrl: './new-management-comment.component.html',
  styleUrls: ['./new-management-comment.component.scss']
})
export class NewManagementCommentComponent {

    titulo = "Manager comments";
    formManagerComment = new FormGroup({
      request_id: new FormControl<number>(0),
      request_type: new FormControl<string>("", Validators.required),
      details: new FormControl<string>("", Validators.required),
      request_status: new FormControl<number>(1, Validators.required),
    });
    catsAttentionStatus: any[] = [];
  
    constructor(
      private _service: MainService,
      private toastr: ToastrService,
      private dialogRef: MatDialogRef<NewManagementCommentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    ngOnInit() {
      this.getCatAttentionStatus();
      if (this.data?.request_id) {
        this.formManagerComment.patchValue(this.data);
        this.titulo = "Update information request";
      }
    }
  
    async getCatAttentionStatus() {
      (await this._service.getCatAtendant()).subscribe((resp: Resultado) => {
        if (resp.success == "true") {
          this.catsAttentionStatus = resp.data;
        } else this.toastr.error(resp.message, "Error");
      });
    }
  
    AddEditComment() {
      if (this.formManagerComment.invalid) {
        this.toastr.warning("The form is not valid, try again", "Form not valid");
        return;
      }
      if (this.formManagerComment.value.request_id) this.EditEnterpice();
      else this.AddEnterpice();
    }
  
    EditEnterpice = async () => {
      let request = { ...this.formManagerComment.value };
      (await this._service.updateProductDetail(request)).subscribe(
        (resp: Resultado) => {
          if (resp.success == "true") {
            this.toastr.success(
              "The information request was updated successfully",
              "Success"
            );
            this.onNoClick(true);
          } else this.toastr.error(resp.message, "Error");
        }
      );
    };
  
    AddEnterpice = async () => {
      let request = { ...this.formManagerComment.value };
      (await this._service.sendProductDetails(request)).subscribe(
        (resp: Resultado) => {
          if (resp.success == "true") {
            this.toastr.success(
              "The information request was send successfully",
              "Success"
            );
            this.onNoClick(true);
          } else {
            this.toastr.error(resp.message, "Error");
          }
        }
      );
    };
  
    onNoClick(resp: boolean = false) {
      this.dialogRef.close(resp);
    }
}
