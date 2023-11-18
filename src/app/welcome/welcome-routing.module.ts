import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { SofappsHomeComponent } from './sofapps-home/sofapps-home.component';
import { SofappsPasswordComponent } from './sofapps-password/sofapps-password.component';
import { SofappsParametrageComponent } from './sofapps-parametrage/sofapps-parametrage.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: SofappsHomeComponent },
      { path: 'motdepasse', component: SofappsPasswordComponent },
      { path: 'parametrage', component: SofappsParametrageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
