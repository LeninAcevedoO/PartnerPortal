import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewProductsDetailsComponent } from 'src/app/pages/new-products-details/new-products-details.component';

export interface genericCard {
  id: number | string,
  title: string,
  multimedia_link: string,
  multimedia_type_id: number,
  description: string, 
  subtitle?: string
}

@Component({
  selector: 'app-demo-card',
  templateUrl: './demo-card.component.html',
  styleUrls: ['./demo-card.component.scss']
})
export class DemoCardComponent {

  @Input() genData!: genericCard;

  constructor(private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  navigateToDemo() {
    this.router.navigate(['demos', this.genData.id]);
  }

  addFavorite(favorite: any) {
    this.toastr.success('Demo added to favorites', 'Favorite');

  }

  requestDetails(d: any) {
    const data = {
      id: d.id,
      title: d.title,
    }
    this.dialog.open(NewProductsDetailsComponent, {
      data: data,
      panelClass: 'post-dialog-container',
    })
  }
}
