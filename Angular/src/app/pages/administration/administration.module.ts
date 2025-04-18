import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from "./administration-routing.module";
import { SettingsComponent } from "./settings/settings.component";
import { UsersListComponent } from "./settings/users/users-list/users-list.component";
import { NewEnterpriceComponent } from "./settings/catalogs/enterprices/new-enterprice/new-enterprice.component";
import { EnterpriceListComponent } from "./settings/catalogs/enterprices/enterprice-list/enterprice-list.component";
import { ProductsDetailsListComponent } from "./settings/product-details/products-details-list/products-details-list.component";
import { MediaLinksListComponent } from "./settings/media-links/media-links-list/media-links-list.component";
import { NewMediaLinksComponent } from "./settings/media-links/new-media-links/new-media-links.component";
import { RolesListComponent } from "./settings/catalogs/roles/roles-list/roles-list.component";
import { NewRolComponent } from "./settings/catalogs/roles/new-rol/new-rol.component";
import { StatusAtendantListComponent } from "./settings/catalogs/status-atendant/status-atendant-list/status-atendant-list.component";
import { StatusNewAtendantComponent } from "./settings/catalogs/status-atendant/status-new-atendant/status-new-atendant.component";
import { CatalogsComponent } from "./settings/catalogs/catalogs.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ManagementCommentListComponent } from "./settings/management-comments/management-comment-list/management-comment-list.component";
import { VerticalsListComponent } from "../verticals/verticals-list/verticals-list.component";
import { AddVerticalComponent } from "../verticals/add-vertical/add-vertical.component";

@NgModule({
  declarations: [
    SettingsComponent,
    UsersListComponent,
    NewEnterpriceComponent,
    EnterpriceListComponent,
    ProductsDetailsListComponent,
    MediaLinksListComponent,
    NewMediaLinksComponent,
    RolesListComponent,
    NewRolComponent,
    StatusAtendantListComponent,
    StatusNewAtendantComponent,
    CatalogsComponent,
    ManagementCommentListComponent,
    VerticalsListComponent,
    AddVerticalComponent
  ],
  imports: [
    AdministrationRoutingModule,
    CommonModule,
    SharedModule,
  ],
})
export class AdministrationModule {}
