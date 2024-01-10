import { Chantier } from './chantier.model';
import { Collaborateur } from './collaborateur.model';

export class Tache {
  constructor(
    public idTache?: number,
    public libelle?: String,
    public dateDebut?: String,
    public dateFin?: String,
    public heureDebut?: String,
    public heureFin?: String,
    public commantaire?: String,
    public idChantier?: Chantier,
    public responsable?: Collaborateur,
    public nomCompletResponsable?: String,
    public nomCompletChantier?: String
  ) {}
}
