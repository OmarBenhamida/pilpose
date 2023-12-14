import { Collaborateur } from './collaborateur.model';

export class Conge {
  constructor(
    public idConge?: number,
    public reference?: String,
    public statut?: String,
    public dateDebut?: String,
    public dateFin?: String,
    public dateDepot?: String,
    public heureDebut?: number,
    public heureFin?: number,
    public typeConge?: String,
    public idCollaborateur?: Collaborateur
  ) {}
}
