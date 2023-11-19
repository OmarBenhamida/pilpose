import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AuthGuard } from './login/auth-guard.guard';
import { NotLoggedInGuardGuard } from './login/not-logged-in-guard.guard';
import { HostService } from './service/host.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login', component: LoginAdminComponent,
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
