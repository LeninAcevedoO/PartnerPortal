import { Component, ChangeDetectorRef } from "@angular/core";
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
  vertical: number = 0;
  demos: any[] = [];
  buscador = "";

  constructor(
    private aRoute: ActivatedRoute,
    private _service: MainService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {
    this.vertical = Number(this.aRoute.snapshot.paramMap.get("vertix"));
  }

  ngOnInit() {
    if (this.vertical) this.getDemos();
  }

  async getDemos() {
    (await this._service.getDemosByVertical(this.vertical)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.demos = resp.data;
          this.cdRef.detectChanges();
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
