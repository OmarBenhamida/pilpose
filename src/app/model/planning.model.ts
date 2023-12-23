import { Collaborateur } from "./collaborateur.model";
import { Tache } from "./tache.model";

export class PlanningDto {
    public idCollaborateur?: Collaborateur;
    public idTache?: Tache;
}