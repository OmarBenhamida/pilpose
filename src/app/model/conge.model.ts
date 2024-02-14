import { Collaborateur } from './collaborateur.model';

export class Conge {
  constructor(
    public idConge?: number,
    public reference?: String,
    public statut?: String,
    public dateDebut?: String,
    public dateFin?: String,
    public dateDepot?: String,
    public commantaire?: String,
    public heureDebut?: number,
    public heureFin?: number,
    public typeConge?: String,
    public nomCompletEmploye?: String,
    public idCollaborateur?: Collaborateur,
    public validationChefEquipe?: boolean,
    public validationResponsableTravaux?: boolean,
    public validationGerant?: boolean,
    public validationResponsableAdministratif?: boolean,

  ) {}
}
