export class User {
    user_name: string;
    nom_complet: string;
    token_dto : {expires:string,header:string ,token : string, id: number,refresh: string,matricule: string,sexe: string};
    menu: [{id: string, idMenu: string, libelle: string, icon: string, url: string, childMenu: any[]}]
    photo:any;
}
