import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from '../layouts/toolbar/toolbar.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersListComponent } from './settings/users/users-list/users-list.component';
import { ManagementCommentListComponent } from './settings/management-comments/management-comment-list/management-comment-list.component';
import { MediaLinksListComponent } from './settings/media-links/media-links-list/media-links-list.component';
import { ProductsDetailsListComponent } from './settings/product-details/products-details-list/products-details-list.component';
import { EnterpriceListComponent } from './settings/catalogs/enterprices/enterprice-list/enterprice-list.component';
import { RolesListComponent } from './settings/catalogs/roles/roles-list/roles-list.component';
import { StatusAtendantListComponent } from './settings/catalogs/status-atendant/status-atendant-list/status-atendant-list.component';
import { CatalogsComponent } from './settings/catalogs/catalogs.component';

const routes: Routes = [
  
  {
    path: '',
    component: ToolbarComponent,
    children: [
      { path: '', component: SettingsComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'management-comments', component: ManagementCommentListComponent },
      { path: 'links', component: MediaLinksListComponent },
      { path: 'product-details', component: ProductsDetailsListComponent },
      
      { path: 'catalogs', component: CatalogsComponent },
      { path: 'catalogs/enterprices', component: EnterpriceListComponent },
      { path: 'catalogs/roles', component:  RolesListComponent},
      { path: 'catalogs/atendant', component: StatusAtendantListComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
