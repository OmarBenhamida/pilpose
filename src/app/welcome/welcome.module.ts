import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { HostService } from './../service/host.service';
import { HttpClientRequest } from './../service/http-request.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { SofappsHomeComponent } from './sofapps-home/sofapps-home.component';
import { SofappsParametrageComponent } from './sofapps-parametrage/sofapps-parametrage.component';
import { SofappsPasswordComponent } from './sofapps-password/sofapps-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatDivider, MatDividerModule } from '@angular/material/divider';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    SofappsHomeComponent,
    SofappsParametrageComponent,
    SofappsPasswordComponent,
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'fr',
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers:[HttpClientRequest,HostService]
})
export class WelcomeModule {}
