import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//-------------------------- General Compoents ----------------------------
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { SettingsComponent } from "./pages/administration/settings/settings.component";
import { LoginComponent } from "./components/auth/login/login.component";
//-------------------------- Settings Components ----------------------------
import { Page404Component } from "./shared/components/page-404/page-404.component";
//-------------------------- Guards ----------------------------
import { adminGuard } from "./shared/guards/admin.guard";
import { authGuard } from "./shared/guards/auth.guard";
import { FavoritesComponent } from "./pages/favorites/favorites.component";
import { VerticalsComponent } from "./pages/verticals/verticals.component";
import { DemosComponent } from "./pages/verticals/demos/demos.component";
import { HomeOnlineComponent } from "./pages/home-online/home-online.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },

  {
    path: "",
    component: ToolbarComponent,
    children: [
      {
        path: "home",
        component: HomeOnlineComponent,
      },
      {
        path: "verticals",
        component: VerticalsComponent,
      },
      {
        path: "verticals/:vertix",
        component: DemosComponent,
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./pages/administration/administration.module").then(
            (m) => m.AdministrationModule
          ),
        canActivateChild: [adminGuard],
      },
      {
        path: "favorites",
        component: FavoritesComponent,
      },
    ],
    canActivateChild: [authGuard],
  },
  { path: "page404", component: Page404Component },
  { path: "**", redirectTo: "page404", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
