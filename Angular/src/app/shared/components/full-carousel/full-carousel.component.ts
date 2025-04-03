import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SlickCarouselModule } from "ngx-slick-carousel";

@Component({
  selector: "app-full-carousel",
  standalone: true,
  imports: [SlickCarouselModule, CommonModule, MatButtonModule, MatIconModule, RouterModule, MatTooltipModule],
  templateUrl: "./full-carousel.component.html",
  styleUrls: ["./full-carousel.component.scss"],
})
export class FullCarouselComponent {
  // @Input() 
  slides: any[] = [
    { img: "assets/img/demos/Workforce/image1.jpg", title: 'Demo name', description: 'A little description about the demo' },
    { img: "assets/img/demos/HHS/image1.jpg", title: 'Demo name', description: 'A little description about the demo' },
    { img: "assets/img/demos/Workforce/image3.jpg", title: 'Demo name', description: 'A little description about the demo' },
    { img: "assets/img/demos/HHS/image2.jpg", title: 'Demo name', description: 'A little description about the demo' },
  ];

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
}
