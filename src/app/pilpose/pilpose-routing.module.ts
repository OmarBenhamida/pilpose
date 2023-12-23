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


const routes: Routes = [
  {
    path: '',
    component: PilposeComponent,
    children: [
      { path: '', redirectTo: 'plannig', pathMatch: 'full' },
      { path: 'plannig00', component: PlannigComponent },
      {path: 'plannig', loadChildren: () => import('./plannig/planning.module').then(m => m.PlanningModule)},
      { path: 'conge', component: CongeComponent },
      { path: 'add-conge', component: AddCongeComponent },
      { path: 'chantier', component: ChantierComponent },
      { path: 'add-chantier', component: AddChantierComponent },
      { path: 'tache', component: TacheComponent },
      { path: 'add-tache', component: AddTacheComponent},
      { path: 'note', component: NotesComponent },
      { path: 'add-note', component: AddNoteComponent },
      { path: 'comptes', component: ComptesComponent },
      { path: 'info-collab', component: InfoCollabComponent },
      { path: 'affectation', component: AffectationComponent },
      
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilposeRoutingModule {}
