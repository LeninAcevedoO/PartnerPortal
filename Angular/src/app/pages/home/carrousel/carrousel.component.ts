import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: "app-carrousel",
  templateUrl: "./carrousel.component.html",
  styleUrls: ["./carrousel.component.scss"],
})
export class CarrouselComponent implements OnInit {
  demos: any[] = [];
  myFavorites: string[] = [];
  currentIndex: number = 0;
  groupedDemos: any[][] = [];

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
        this.groupDemos();
        this.cdRef.detectChanges();
      } else {
        this.toastr.error("Error al obtener los demos");
      }
    });
  }

  setFavorite(post: any) {
    this._service.setFavorite(post.favorite_id).then((observable) => {
      observable.subscribe((resp: Resultado) => {
        if (resp.success == "true") {
          this.toastr.success("Agregado a favoritos");
        }
      });
    });
  }

  groupDemos() {
    if (!this.demos || this.demos.length === 0) return;
    
    const itemsPerGroup = 5; // Aseguramos que cada slide tenga 5 tarjetas
    this.groupedDemos = [];
    
    for (let i = 0; i < this.demos.length; i += itemsPerGroup) {
      this.groupedDemos.push(this.demos.slice(i, i + itemsPerGroup));
    }
    console.log(this.groupedDemos)
  }

  nextSlide() {
    if (this.currentIndex < this.groupedDemos.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.groupedDemos.length - 1;
    }
  }

  lastPage() {
    return this.currentIndex < this.groupedDemos.length - 1;
  }

  consolelog(item: any) {
    console.log(item);
  }
}
