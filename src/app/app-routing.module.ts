import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AuthGuard } from './login/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { NotLoggedInGuardGuard } from './login/not-logged-in-guard.guard';
import { HostService } from './service/host.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginAdminComponent,
    canActivate: [NotLoggedInGuardGuard],
  },
  { path: 'ssm', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },

  {
    path: 'accueil',
    component: AccueilComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
  providers: [HostService],
})
export class AppRoutingModule {}
