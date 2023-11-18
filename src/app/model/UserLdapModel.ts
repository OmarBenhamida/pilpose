
/**
 * model User Ldap
 */
export interface UserLdapModel {
  idUser: number;
  username: string;
  nom: string;
  prenom: string;
  expiredDay: number;
  pwdLastSetDate: string;
  isLocked: boolean;
  stausCount: boolean;
  nom_complet: string;
}
