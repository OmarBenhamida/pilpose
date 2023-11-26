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
import { SharedModule } from '../Shared/shared.module';
import { AvoDatatableComponent } from './avo-datatable/avo-datatable.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
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
    AddChantierComponent,
    AvoDatatableComponent,
    ConfirmModalComponent,
    AddTacheComponent,
    UpdateTacheComponent,
    ComptesComponent,
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
  ],
  providers:[HttpClientRequest,HostService]
})
export class PilposeModule {}
