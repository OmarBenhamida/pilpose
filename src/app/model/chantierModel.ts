import { Localisation } from "./localisation.model";

export interface ChantierModel {
    idChantier?: number;
    reference: string;
    nomChantier: string;
    client: string;
    localisationDto: Localisation;
    etat: string;
  }