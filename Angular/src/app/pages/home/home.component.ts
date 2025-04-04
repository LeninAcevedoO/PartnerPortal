import { UtilsService } from "src/app/shared/utils/utils.service";
import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  demos: any = {
    Education: [],
    Health: [],
    Workforce: [],
    Corrections: [],
    PublicSector: [],
  };

  constructor(
    private toastr: ToastrService,
    private utilsService: UtilsService,
    private _serice: MainService
  ) {}

  ngOnInit() {
    this.getAllDemos();
    console.log(this.demos)
  }

  getAllDemos() {
    this.demos.Education = this.getVerticals(1);
    this.demos.Health = this.getVerticals(2);
    this.demos.Workforce = this.getVerticals(3);
    this.demos.Corrections = this.getVerticals(4);
    this.demos.PublicSector = this.getVerticals(5);
  }

  async getVerticals(idVertical: number) {
    (await this._serice.getDemosByVertical(idVertical)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") return resp.data;
        else {
          this.toastr.error(resp.message);
          return [];
        }
      }
    );
  }
}
