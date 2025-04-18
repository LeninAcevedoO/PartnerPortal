import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Page404Component } from "./components/page-404/page-404.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { ContextService } from "src/app/services/services/context.service";
import { MainService } from "src/app/services/services/main.service";
import { MaterialsModule } from "./materials/materials.module";
import { BuscadorGenericoPipe } from "./pipes/buscador-generico.pipe";
import { CardPipe } from "./pipes/card.pipe";
import { PhoneNumberPipe } from "./pipes/phone-number.pipe";
import { CustomCurrencyPipe } from "./pipes/custom-currency.pipe";
import { MultimediaViewerComponent } from "./components/multimedia-viewer/multimedia-viewer.component";
import { CardCarouselOnlineComponent } from "./components/card-carousel-online/card-carousel-online.component";
import { FullCarouselOnlineComponen } from "./components/full-carousel-online/full-carousel-online.component";

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
  CardCarouselOnlineComponent,
  FullCarouselOnlineComponen,
];

const GenericComponents = [
  BuscadorGenericoPipe,
  CardPipe,
  CustomCurrencyPipe,
  PhoneNumberPipe,
  MultimediaViewerComponent,
];

@NgModule({
  declarations: [GenericComponents],
  imports: [modules],
  exports: [GenericComponents, modules],
  providers: [ContextService, MainService],
})
export class SharedModule {}
