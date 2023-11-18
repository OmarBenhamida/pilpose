import { TokenModel } from './token.model';

/**
 * current user model data
 */
export class CurrentUserModel {
  /**
   *
   * @param siteAffectation
   * @param matricule
   * @param user_name
   * @param nom_complet
   * @param photo
   * @param token_dto
   * @param userModules
   */
  constructor(
    public siteAffectation: string,
    public matricule: string,
    public user_name: string,
    public nom_complet: string,
    public photo: string,
    public token_dto: TokenModel,
  ) {}
}
