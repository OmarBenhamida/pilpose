import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { HostService } from './service/host.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login', component: LoginAdminComponent,
    
  },

  {
    path: 'modules',
    component: AccueilComponent,
    
  },

  {
    path: 'change-pwd', component: ChangePwdComponent,
    
  },

  {
    path: 'pilpose', loadChildren: () => import('./pilpose/pilpose.module').then((m) => m.PilposeModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [HostService],
})
export class AppRoutingModule { }
