import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';
import { SessionGuard } from '@core/guards/session.guard';

const routes: Routes = [ //router-outlet (Padre)
  {
    path: 'auth', //TODO: localhost:4200/home/dashboard
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) //Importación dinámica
  },
  {
    path: '', 
    component: HomePageComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), //Importación dinámica
    canActivate: [SessionGuard] //Puede contener varios guardianes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
