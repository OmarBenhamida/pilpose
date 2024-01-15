import { Chantier } from './chantier.model';

export class ChantierRecap {
  constructor(
    public totalHeuresTravaille?: number,
    public idChantier?: Chantier,
    public reference?: String,
    public etat?: String,
    public nomChantier?: String,
    public ville?: String
  ) {}
}
