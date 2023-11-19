import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChantierComponent } from './chantier/chantier.component';
import { CongeComponent } from './conge/conge.component';
import { PilposeComponent } from './pilpose.component';
import { PlannigComponent } from './plannig/plannig.component';
import { TacheComponent } from './tache/tache.component';
import { NotesComponent } from './notes/notes.component';


const routes: Routes = [
  {
    path: '',
    component: PilposeComponent,
    children: [
      { path: '', redirectTo: 'plannig', pathMatch: 'full' },
      { path: 'plannig', component: PlannigComponent },
      { path: 'conge', component: CongeComponent },
      { path: 'chantier', component: ChantierComponent },
      { path: 'tache', component: TacheComponent },
      { path: 'note', component: NotesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilposeRoutingModule {}
