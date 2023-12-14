import { Chantier } from './chantier.model';
import { Collaborateur } from './collaborateur.model';
import { Tache } from './tache.model';

export class Affectation {
  constructor(
    public idAffectation?: number,
    public idCollaborateur?: Collaborateur,
    public idTache?: Tache
  ) {}
}
