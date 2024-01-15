import { Collaborateur } from './collaborateur.model';

export class CollaborateurRecap {
  constructor(
    public totalHeuresTravaille?: number,
    public idCollaborateur?: Collaborateur,
    public nomCompletResponsable?: String
  ) {}
}
