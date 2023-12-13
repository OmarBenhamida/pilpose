import { Chantier } from './chantier.model';
import { Collaborateur } from './collaborateur.model';

export class Affectation {
  constructor(
    public idAffectation?: number,
    public idCollaborateur?: Collaborateur,
    public idChantier?: Chantier
  ) {}
}
