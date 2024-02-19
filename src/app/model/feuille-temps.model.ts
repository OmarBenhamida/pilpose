import { Chantier } from './chantier.model';
import { Collaborateur } from './collaborateur.model';

export class FeuilleTemps {
  constructor(
    public idFeuilleTemps?: number,
    public reference?: String,
    public typeTravaux?: String,
    public jourSemaine?: String,
    public heureTravaille?: number,
    public vehicule?: String,
    public vehiculeSuite?: String,
    public km?: number,
    public commantaire?: String,
    public idCollaborateur?: Collaborateur,
    public responsable?: Collaborateur,
    public nomCompletResponsable?: String,
    public nomCompletChantier?: String,
    public nomCompletSalarie?: String,
    public nomCompletClient?: String,
    public statut?: String,
    public ville?: String,
    public idChantier?: Chantier,
    public validationChefEquipe?: boolean,
    public validationResponsableTravaux?: boolean,
    public validationGerant?: boolean,
    public validationResponsableAdministratif?: boolean,
    public metier?: String,
    public indemnite?: boolean,
  ) {}
}
