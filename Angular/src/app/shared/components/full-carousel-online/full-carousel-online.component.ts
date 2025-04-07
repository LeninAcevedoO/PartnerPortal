import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { ModalDemoDetailsComponent } from "src/app/pages/verticals/modal-demo-details/modal-demo-details.component";

@Component({
  selector: "app-full-carousel-online",
  templateUrl: "./full-carousel-online.component.html",
  styleUrls: ["./full-carousel-online.component.scss"],
  standalone: true,
  imports: [
    SlickCarouselModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule,
  ],
})
export class FullCarouselOnlineComponen implements OnChanges {

  @Input() slides: any[] = [];

  constructor(private cdRef: ChangeDetectorRef,
              private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    console.log('Slides recibidos:', this.slides);
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    this.cdRef.detectChanges();
    if (changes["slides"]) {
      // Puedes validar aquí si el array tiene contenido
      console.log("Cambios en slides:", this.slides);

      // Forzar detección de cambios si es necesario
      this.cdRef.detectChanges();
    }
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
    ],
  };


    openDialogDetails(slide: any) {
      this.dialog.open(ModalDemoDetailsComponent, {
        data: slide,
        width: "80%",
      });
    }
}
