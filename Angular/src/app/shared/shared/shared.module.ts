import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Page404Component } from "../components/page-404/page-404.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { ContextService } from "src/app/services/services/context.service";
import { MainService } from "src/app/services/services/main.service";
import { MaterialsModule } from "../materials/materials.module";
import { BuscadorGenericoPipe } from "../pipes/buscador-generico.pipe";
import { CardPipe } from "../pipes/card.pipe";
import { PhoneNumberPipe } from "../pipes/phone-number.pipe";
import { CustomCurrencyPipe } from "../pipes/custom-currency.pipe";
import { MultimediaViewerComponent } from "../components/multimedia-viewer/multimedia-viewer.component";
import { DemoCardComponent } from "../components/demo-card/demo-card.component";
import { CardCarouselComponent } from "../components/card-carousel/card-carousel.component";
import { FullCarouselComponent } from "../components/full-carousel/full-carousel.component";

const modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialsModule,
  NgxSpinnerModule,
  ToastrModule.forRoot({
    positionClass: "toast-bottom-center",
    progressBar: true,
  }),
  CommonModule,
  FullCarouselComponent,
  CardCarouselComponent,
];

const GenericComponents = [
  BuscadorGenericoPipe,
  CardPipe,
  CustomCurrencyPipe,
  PhoneNumberPipe,
  MultimediaViewerComponent,
  DemoCardComponent,
];

@NgModule({
  declarations: [GenericComponents],
  imports: [modules],
  exports: [GenericComponents, modules],
  providers: [ContextService, MainService],
})
export class SharedModule {}
