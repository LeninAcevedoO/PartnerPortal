import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: "app-home-online",
  templateUrl: "./home-online.component.html",
  styleUrls: ["./home-online.component.scss"],
})
export class HomeOnlineComponent {
  demos: any = {
    Education: [],
    Health: [],
    Workforce: [],
    Corrections: [],
    Others: [],
  };
  demosLoaded: string[] = [];
  demosLoadedArr: any[] = [];

  constructor(
    private toastr: ToastrService,
    private _serice: MainService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllDemos();
  }

  async getAllDemos() {
    this.getVerticals(1, "Education");
    this.getVerticals(2, "Health");
    this.getVerticals(3, "Workforce");
    this.getVerticals(4, "Corrections");
    // this.getVerticals(5, "PublicSector");
    this.getVerticals(7, "PrivateSector");
    this.getVerticals(6, "Others");
  }

  async getVerticals(idVertical: number, vertical: string) {
    (await this._serice.getDemosByVertical(idVertical)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") {
          this.demosLoaded.push(vertical);
          if (resp.data.length > 0) {
            this.cdRef.detectChanges();

            if (this.demosLoaded.length >= 6) this.fillFullCarousel();
          }
          this.demos[vertical] = resp.data;
        } else this.toastr.error(resp.message);
      }
    );
  }

  fillFullCarousel() {
    if (this.demosLoaded.length > 0) {
      const tempArr = this.demosLoaded.flatMap((el: string) => {
        return this.demos[el]; 
      });
      const demosToMainCarousel = tempArr.filter((x: any) => Boolean(x.isMainCarusel) == true);
      this.demosLoadedArr.push(...demosToMainCarousel);
      this.cdRef.detectChanges();
    }    
  }
}
