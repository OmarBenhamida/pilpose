import { Client } from "./client.model";
import { Localisation } from "./localisation.model";

export class Chantier {
  constructor(
    public idChantier?: number,
    public reference?: String,
    public clientDto?: Client,
    public etat?: String,
    public nomCompletClient?: String,
    public nomChantier?: String,
    public ville? : String,
    public localisationDto?: Localisation

  ) {}
}
