import { Chantier } from './chantier.model';

export class Tache {
  constructor(
    public idTache?: number,
    public reference?: String,
    public libelle?: String,
    public dateDebut?: String,
    public dateFin?: String,
    public heureDebut?: number,
    public heureFin?: number,
    public commantaire?: String,
    public idChantier?: Chantier
  ) {}
}
