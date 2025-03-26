import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: "app-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.scss"],
})
export class ContentListComponent {
  contents: any[] = [];

  constructor(private toastr: ToastrService, private _mainSvc: MainService) {}

  ngOnInit() {
    this.getContents();
  }

  async getContents() {
    (await this._mainSvc.getLinksToShow()).subscribe((resp: Resultado) => {
      if (resp.success == "true") this.contents = resp.data;
      else this.toastr.error(resp.message);
    });
  }
}
