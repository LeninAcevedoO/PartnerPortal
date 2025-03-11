import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/services/main.service';
import { Resultado } from 'src/app/shared/models/general.model';
import { getWhiteBlackColor } from 'src/app/shared/utils/utils.functions';

@Component({
  selector: 'app-new-management-comment',
  templateUrl: './new-management-comment.component.html',
  styleUrls: ['./new-management-comment.component.scss']
})
export class NewManagementCommentComponent {

    titulo = "Manager comments";
    formManagerComment = new FormGroup({
      comment_id: new FormControl<number>(0),
      comment_title: new FormControl<string>("", Validators.required),
      comment_content: new FormControl<string>("", Validators.required),
      comment_solution: new FormControl<string>(""),
      attention_status_id: new FormControl<number>(1, Validators.required),
    });
    catsAttentionStatus: any[] = [];
    isTaken = false;
  
    constructor(
      private _service: MainService,
      private toastr: ToastrService,
      private router: Router,
      private dialogRef: MatDialogRef<NewManagementCommentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    ngOnInit() {
      if (this.data?.comment_id) {
        this.formManagerComment.patchValue(this.data);
        this.titulo = "Update manager comment";
        this.isTaken = true;
        this.formManagerComment.get('comment_content')?.disable();
        this.formManagerComment.get('comment_title')?.disable();
        this.getCatAttentionStatus();
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
      if (this.formManagerComment.value.comment_id) this.EditComment();
      else this.addComment();
    }
  
    EditComment = async () => {
      let comment = { ...this.formManagerComment.value };
      (await this._service.updateManagerComment(comment)).subscribe(
        (resp: Resultado) => {
          if (resp.success == "true") {
            this.toastr.success(
              "The information comment was updated successfully",
              "Success"
            );
            this.onNoClick(true);
          } else this.toastr.error(resp.message, "Error");
        }
      );
    };
  
    addComment = async () => {
      let comment = { ...this.formManagerComment.value,
        route: this.router.url
       };
      (await this._service.sendManagerComments(comment)).subscribe(
        (resp: Resultado) => {
          if (resp.success == "true") {
            this.toastr.success(
              "The information comment was send successfully",
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
