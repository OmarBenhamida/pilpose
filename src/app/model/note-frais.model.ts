import { Chantier } from "./chantier.model";
import { Collaborateur } from "./collaborateur.model";

export class NoteFrais {
  constructor(
    public idNoteFrais?: number,
    public reference?: String,
    public typeNote?: String,
    public dateNote?: String,
    public recu?: File,
    public statut?: String,
    public idCollaborateur?: Collaborateur,
    public nomCompletEmploye? : String
  ) {}
}
