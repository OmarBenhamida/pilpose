import { Chantier } from './chantier.model';
import { Collaborateur } from './collaborateur.model';

export class FeuilleTemps {
  constructor(
    public idFeuilleTemps?: number,
    public reference?: String,
    public typeTravaux?: String,
    public jourSemaine?: String,
    public heureTravaille?: String,
    public panier?: File,
    public vehicule?: String,
    public idCollaborateur?: Collaborateur,
    public idChantier?: Chantier
  ) {}
}
