import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SlickCarouselModule } from "ngx-slick-carousel";

@Component({
  selector: "app-card-carousel-online",
  templateUrl: "./card-carousel-online.component.html",
  styleUrls: ["./card-carousel-online.component.scss"],
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
export class CardCarouselOnlineComponent implements OnChanges{
  @Input() slides: any[] = [];

  constructor(private cdRef: ChangeDetectorRef) {}

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
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
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
}
