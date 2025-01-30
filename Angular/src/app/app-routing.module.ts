import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//-------------------------- General Compoents ----------------------------
import { ToolbarComponent } from './pages/layouts/toolbar/toolbar.component';
import { SettingsComponent } from './pages/administration/settings/settings.component';
import { LoginComponent } from './components/auth/login/login.component';
//-------------------------- Settings Components ----------------------------
import { Page404Component } from './shared/components/page-404/page-404.component';
//-------------------------- Guards ----------------------------
import { adminGuard } from './shared/guards/admin.guard';
import { authGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 

  {
    path: '',
    component: ToolbarComponent,
    children: [
      { path: 'home', component: HomeComponent },

      {
        path: 'settings',
        loadChildren: () => import('./pages/administration/administration.module').then(m => m.AdministrationModule),
        // canActivateChild: [adminGuard]
      },
      {
        path: 'about-us', component: AboutUsComponent
      },
    ],
    // canActivateChild: [authGuard]
  },
  {path: 'login', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'page404', component: Page404Component },
  { path: '**', redirectTo: 'page404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
