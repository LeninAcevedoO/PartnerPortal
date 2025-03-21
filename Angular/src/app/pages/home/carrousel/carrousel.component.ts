import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: "app-carrousel",
  templateUrl: "./carrousel.component.html",
  styleUrls: ["./carrousel.component.scss"],
})
export class CarrouselComponent {
  demos: any[] = [];
  myFavorites: string[] = [];
  currentIndex: number = 0;

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.getAllDemos();
  }

  async getAllDemos() {
    (await this._service.getDemosByVertical(0)).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.demos = resp.data;
        this.cdRef.detectChanges();
      } else {
        this.toastr.error("Error al obtener los demos");
      }
    });
  }

  async setFavorite(post: any) {
    (await this._service.setFavorite(post.favorite_id)).subscribe(
      (resp: Resultado) => {
        if (resp.success == "true") this.toastr.success("");
      }
    );
  }

  nextSlide() {
    if (this.currentIndex < Math.ceil(this.demos.length / 5) - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.demos.length - 1;
    }
  }
}
