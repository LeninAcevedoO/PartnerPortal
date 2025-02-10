import { ChangeDetectorRef ,Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/services/services/main.service";
import { Resultado } from "src/app/shared/models/general.model";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  buscador = "";
  favorites: any[] = [];

  constructor(
    private _service: MainService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites = async () => {
    (await this._service.getFavorites()).subscribe((resp: Resultado) => {
      if (resp.success == "true") {
        this.favorites = resp.data;
        this.cdRef.detectChanges();
      } else this.toastr.error(resp.message, "Error");
      console.log(this.favorites);
    });
  };
}


