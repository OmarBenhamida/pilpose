import { Tache } from './tache.model';

export class UpdateTacheAffectation {
  constructor(public listIdsCollab?: number[], public tache?: Tache) {}
}
