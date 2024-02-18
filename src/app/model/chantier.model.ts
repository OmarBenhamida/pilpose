import { Client } from "./client.model";
import { Collaborateur } from "./collaborateur.model";
import { Localisation } from "./localisation.model";

export class Chantier {
  constructor(
    public idChantier?: number,
    public reference?: String,
    public clientDto?: Collaborateur,
    public etat?: String,
    public nomCompletClient?: String,
    public nomChantier?: String,
    public ville? : String,
    public localisationDto?: Localisation

  ) {}
}
