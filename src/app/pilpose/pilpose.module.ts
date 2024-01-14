import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongeComponent } from './conge/conge.component';
import { NotesComponent } from './notes/notes.component';
import { ChantierComponent } from './chantier/chantier.component';
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

import { PilposeRoutingModule } from './pilpose-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../Shared/shared.module';
import { AvoDatatableComponent } from './avo-datatable/avo-datatable.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AddTacheComponent } from './tache/add-tache/add-tache.component';
import { UpdateTacheComponent } from './tache/update-tache/update-tache.component';
import { ComptesComponent } from './comptes/comptes.component';
import { HttpClientRequest } from '../shared/services/common/http-request.service';
import { UpdateChantierComponent } from './chantier/update-chantier/update-chantier.component';
import { AddCongeComponent } from './conge/add-conge/add-conge.component';
import { UpdateCongeComponent } from './conge/update-conge/update-conge.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { UpdateNoteComponent } from './notes/update-note/update-note.component';
import { InfoCollabComponent } from './info-collab/info-collab.component';
import { AffectationComponent } from './tache/affectation/affectation.component';
import { AddAffectationComponent } from './tache/affectation/add-affectation/add-affectation.component';
import { UpdateAffectationComponent } from './tache/affectation/update-affectation/update-affectation.component';
import { AddCompteComponent } from './comptes/add-compte/add-compte.component';
import { UpdateCompteComponent } from './comptes/update-compte/update-compte.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MesClientsComponent } from './mes-clients/mes-clients.component';
import { AddClientComponent } from './mes-clients/add-client/add-client.component';
import { UpdateClientComponent } from './mes-clients/update-client/update-client.component';
import { AddChantierComponent } from './chantier/add-chantier/add-chantier.component';
import { TempsComponent } from './temps/temps.component';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    CongeComponent,
    NotesComponent,
    ChantierComponent,
    TacheComponent,
    AddChantierComponent,
    AvoDatatableComponent,
    ConfirmModalComponent,
    AddTacheComponent,
    UpdateTacheComponent,
    UpdateChantierComponent,
    ComptesComponent,
    AddCongeComponent,
    UpdateCongeComponent,
    AddNoteComponent,
    UpdateNoteComponent,
    InfoCollabComponent,
    AffectationComponent,
    AddAffectationComponent,
    UpdateAffectationComponent,
    AddCompteComponent,
    UpdateCompteComponent,
    AddClientComponent,
    UpdateClientComponent,
    MesClientsComponent,
    TempsComponent,
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
    MatCheckboxModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatTreeModule,
    MatListModule,
    
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
    NgbModalModule,
  ],
  providers:[
    HttpClientRequest,
    HostService,
    {
      provide: DateAdapter,
        useFactory: adapterFactory,
    }
  ]
})
export class PilposeModule {}
