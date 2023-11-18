/**
 * token model data
 */
export class TokenModel {
  /**
   *
   * @param header
   * @param expires
   * @param expiresRefresh
   * @param token
   * @param refresh
   * @param id
   * @param idEntite
   * @param sexe
   */
  constructor(
    public header: string,
    public expires: string,
    public expiresRefresh: string,
    public token: string,
    public refresh: string,
    public id: number,
    public idEntite: number,
    public sexe: string
  ) {}
}
