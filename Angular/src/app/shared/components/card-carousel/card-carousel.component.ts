import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SlickCarouselModule } from "ngx-slick-carousel";

@Component({
  selector: "app-card-carousel",
  templateUrl: "./card-carousel.component.html",
  styleUrls: ["./card-carousel.component.scss"],
  standalone: true,
  imports: [SlickCarouselModule, CommonModule, MatButtonModule, MatIconModule, RouterModule, MatTooltipModule],
})
export class CardCarouselComponent {
  // @Input()
  slides: any[] = [
    {
      multimedia_link: "assets/img/demos/Workforce/image1.webp",
      demo_name: "Item name 1",
      description: "A little descriptionabout the demo",
    },
    {
      multimedia_link: "assets/img/demos/HHS/image1.webp",
      demo_name: "Item name 2",
      description: "A little descriptionabout the demo",
    },
    {
      multimedia_link: "assets/img/demos/Workforce/image3.webp",
      demo_name: "Item name 3",
      description: "A little descriptionabout the demo",
    },
    {
      multimedia_link: "assets/img/demos/HHS/image2.webp",
      demo_name: "Item name 4",
      description: "A little descriptionabout the demo",
    },
    {
      multimedia_link: "assets/img/demos/HHS/image3.webp",
      demo_name: "Item name 5 jkashksadjkhakjsdksahdkjahskdjjahsdkjsahjhdjksadhaskjhdjkhsadhjsahjkdz",
      description: "A little descriptionabout the demo",
    },
  ];

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll:4,
    // autoplay: true,
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
