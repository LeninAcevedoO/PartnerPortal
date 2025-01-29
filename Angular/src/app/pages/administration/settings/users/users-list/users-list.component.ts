import { ChangeDetectorRef, Component } from "@angular/core";
import { NewUserComponent } from "../new-user/new-user.component";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent {
  buscador = "";
  users: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers = async () => {
    (await this._service.getUsers()).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.users = resp.data;
        this.cdRef.detectChanges();
      } else this.toastr.error(resp.message, "Error");
    });
  };

  changeUserStatus = async (user: any, toStatus: any) => {
    let userStatus = {
      user_id: user.user_id,
      status_id: [0, 2].includes(toStatus)
        ? toStatus
        : Number(toStatus.checked),
    };

    (await this._service.updateUserStatus(userStatus)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.getUsers();
          this.toastr.success(
            "The user status was changed successfully",
            "Success"
          );
        } else this.toastr.error(resp.message, "Error");
      }
    );
  };

  openAddEditUser(data?: any) {
    this.dialog
      .open(NewUserComponent, {
        panelClass: "post-dialog-container",
        data: data,
      })
      .afterClosed()
      .subscribe((x: boolean) => {
        if (x) this.getUsers();
      });
  }
}
