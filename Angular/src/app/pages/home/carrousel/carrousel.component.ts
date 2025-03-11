import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/services/main.service';
import { Resultado } from 'src/app/shared/models/general.model';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent {
  posts: any[] = [];
  myFavorites: string[] = [];
  currentIndex: number = 0;

  constructor(private _service: MainService,
    private toastr: ToastrService
  ) {}

  async setFavorite(post: any) {
    (await this._service.setFavorite(post.favorite_id)).subscribe((resp: Resultado) => {
      if (resp.success == 'true') 
        this.toastr.success('');
    });
  }

  nextSlide() {
    if (this.currentIndex < this.posts.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Reinicia al inicio
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.posts.length - 1; // Vuelve al final
    }
  }

}
