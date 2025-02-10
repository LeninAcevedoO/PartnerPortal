// --------------------- General ---------------------------
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
//--------------------- Locale ----------------------------------
import { CommonModule, registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
registerLocaleData(localeES, 'es');
//------------------------- Modules ---------------------------------
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared/shared.module';

//------------------------- Interceptors ---------------------------------
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './services/interceptors/spinner.interceptor';
import { ContextService } from './services/services/context.service';
import { HandleErrorInterceptor } from './services/interceptors/handle-error.interceptor';
//------------------------- Componentes ---------------------------------
import { ToolbarComponent } from './pages/layouts/toolbar/toolbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SingUpComponent } from './components/auth/sing-up/sing-up.component';
import { LoginComponent } from './components/auth/login/login.component';
// ----------------------- Modules --------------------------------------

import { Page404Component } from './shared/components/page-404/page-404.component';
import { AutoLogoutComponent } from './shared/components/auto-logout/auto-logout.component';
import { NewProductsDetailsComponent } from './pages/new-products-details/new-products-details.component';
import { NewManagementCommentComponent } from './pages/new-management-comment/new-management-comment.component';
import { NewUserComponent } from './pages/administration/settings/users/new-user/new-user.component';
import { CarrouselComponent } from './pages/home/carrousel/carrousel.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';



@NgModule({
  declarations: [
    //************************ System components ************************
    AppComponent,
    // --- Layouts ---
    ToolbarComponent,
    // --- User compoents ---
    SingUpComponent,
    HomeComponent,
    LoginComponent,
    NewUserComponent,
    // --- Pages ---
    Page404Component,
    AutoLogoutComponent,
    NewProductsDetailsComponent,
    NewManagementCommentComponent,
    CarrouselComponent,
    AboutUsComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    SharedModule,
  ],
  providers: [
    ContextService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: HandleErrorInterceptor, multi: true },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
