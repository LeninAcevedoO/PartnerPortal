import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demo-card',
  templateUrl: './demo-card.component.html',
  styleUrls: ['./demo-card.component.scss']
})
export class DemoCardComponent {

  @Input() favorite: any = {};

  constructor(private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log(this.favorite)
    console.log(this.favorite.multimedia_link)
  }

  navigateToDemo() {
    this.router.navigate(['demos', this.favorite.id]);
  }

  addFavorite(favorite: any) {
    this.toastr.success('Demo added to favorites', 'Favorite');

  }
}
