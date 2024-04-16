import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChantierComponent } from './chantier/chantier.component';
import { CongeComponent } from './conge/conge.component';
import { PilposeComponent } from './pilpose.component';
import { PlannigComponent } from './plannig/plannig.component';
import { TacheComponent } from './tache/tache.component';
import { NotesComponent } from './notes/notes.component';
import { AddChantierComponent } from './chantier/add-chantier/add-chantier.component';
import { AddTacheComponent } from './tache/add-tache/add-tache.component';
import { ComptesComponent } from './comptes/comptes.component';
import { AddCongeComponent } from './conge/add-conge/add-conge.component';
import { AddNoteComponent } from './notes/add-note/add-note.component';
import { InfoCollabComponent } from './info-collab/info-collab.component';
import { AffectationComponent } from './tache/affectation/affectation.component';
import { AddClientComponent } from './mes-clients/add-client/add-client.component';
import { MesClientsComponent } from './mes-clients/mes-clients.component';
import { TempsComponent } from './temps/temps.component';
import { FeuilleTempsComponent } from './feuille-temps/feuille-temps.component';
import { AddFeuilleComponent } from './feuille-temps/add-feuille/add-feuille.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { AddLocalisationComponent } from './localisation/add-localisation/add-localisation.component';
import { AcceuilPageComponent } from './acceuil-page/acceuil-page.component';


const routes: Routes = [
  {
    path: '',
    component: PilposeComponent,
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'plannig00', component: PlannigComponent },
      {path: 'planning', loadChildren: () => import('./plannig/planning.module').then(m => m.PlanningModule)},
      { path: 'conge', component: CongeComponent },
      { path: 'add-conge', component: AddCongeComponent },
      { path: 'chantier', component: ChantierComponent },
      { path: 'clients', component: MesClientsComponent },
      { path: 'add-chantier', component: AddChantierComponent },
      { path: 'add-client', component: AddClientComponent },
      { path: 'tache', component: TacheComponent },
      { path: 'add-tache', component: AddTacheComponent},
      { path: 'note', component: NotesComponent },
      { path: 'add-note', component: AddNoteComponent },
      { path: 'comptes', component: ComptesComponent },
      { path: 'clients', component: AddClientComponent },
      { path: 'info-collab', component: InfoCollabComponent },
      { path: 'affectation', component: AffectationComponent },
      { path: 'all-planning', component: PlannigComponent },
      { path: 'temps', component: TempsComponent },
      { path: 'add-feuille', component: AddFeuilleComponent },
      { path: 'feuilles', component: FeuilleTempsComponent },
      { path: 'add-commune', component: AddLocalisationComponent },
      { path: 'communes', component: LocalisationComponent },
      { path: 'accueil', component: AcceuilPageComponent },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilposeRoutingModule {}
