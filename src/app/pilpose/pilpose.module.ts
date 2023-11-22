import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongeComponent } from './conge/conge.component';
import { NotesComponent } from './notes/notes.component';
import { ChantierComponent } from './chantier/chantier.component';
import { PlannigComponent } from './plannig/plannig.component';
import { TacheComponent } from './tache/tache.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HostService } from '../service/host.service';
import { HttpClientRequest } from '../service/http-request.service';
import { PilposeRoutingModule } from './pilpose-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddChantierComponent } from './chantier/add-chantier/add-chantier.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    CongeComponent,
    NotesComponent,
    ChantierComponent,
    PlannigComponent,
    TacheComponent,
    AddChantierComponent
  ],
  imports: [
    CommonModule,
    PilposeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
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
export class PilposeModule {}
