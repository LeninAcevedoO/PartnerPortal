import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: "app-demos",
  templateUrl: "./demos.component.html",
  styleUrls: ["./demos.component.scss"],
})
export class DemosComponent {
  vertical: string = "";
  demos: any[] = [];

  constructor(
    private aRoute: ActivatedRoute,
    private _service: MainService,
    private toastr: ToastrService
  ) {
    this.vertical = this.aRoute.snapshot.paramMap.get("vertix") || "";
  }

  ngOnInit() {
    if (this.vertical) this.getDemos();
  }

  async getDemos() {
    (await this._service.getDemos(this.vertical)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.demos = resp.data;
        } else this.toastr.error(resp.message, "Error");
      }
    );
  }

  async addFavorite(demo: any) {
    (await this._service.setFavorite(demo)).subscribe((resp: Resultado) => {
      if (resp.success == "true")
        this.toastr.success("Demo added to favorites", "Favorite");
      else this.toastr.error(resp.message, "Error");
    });
  }
}
