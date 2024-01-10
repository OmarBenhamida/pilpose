import { IndividualConfig } from 'ngx-toastr';

export class Constants {
  /**Toast Global config */
  public static toastOptions: Partial<IndividualConfig> = {
    closeButton: true,
    timeOut: 7000,
    progressBar: true,
    progressAnimation: 'decreasing',
    extendedTimeOut: 700,
  };


 public static EXCEL_XLS : string ='application/vnd.ms-excel';
 public static EXCEL_CSV : string ='text/csv';

  public static toastOptionsUpload: Partial<IndividualConfig> = {
    closeButton: true,
    disableTimeOut: true,
    progressBar: true,
  };

  public static toastOptionsEXEJdd: Partial<IndividualConfig> = {
    closeButton: true,
    timeOut: 50000,
    progressBar: true,
    progressAnimation: 'decreasing',
    extendedTimeOut: 20000,
  };

  public static readonly ID_TOAST_IN_PROGRESS_JDD: number = 1;
  public static readonly ID_TOAST_IN_PROGRESS_LOAD_FILE_JDD: number = 2;

  public static ACTION: string = 'ActionChantier';

  /**
   * Chantier Data Tables Structures
   */
  /* table Chantier */
  static CHANTIER_DISPLAY_COLUMNS: string[] = [
    'reference',
    'nomCompletClient',
    'nomChantier',
    'ville',
    'etat',
    'ActionChantier',
  ];
  static CHANTIER_DISPLAY_COLUMNS_NAME: string[] = [
    'TABLES.CHANTIER.REFERENCE',
    'TABLES.CHANTIER.CLIENT',
    'Nom du chantier',
    'TABLES.CHANTIER.LOCALISATION',
    'TABLES.CHANTIER.ETAT',
    'Actions',
  ];

   /**
   * client Data Tables Structures
   */
  /* table Chantier */
  static CLIENT_DISPLAY_COLUMNS: string[] = [
    'nom',
    'prenom',
    'adresse',
    'telephone',
    'ActionChantier',
  ];
  static CLIENT_DISPLAY_COLUMNS_NAME: string[] = [
    'Nom',
    'Prénom',
    'Adresse',
    'Téléphone',
    'Actions',
  ];

  /**
   * Tache Data Tables Structures
   */

  static TACHE_DISPLAY_COLUMNS: string[] = [
    'libelle',
    'dateDebut',
    'dateFin',
    'heureDebut',
    'heureFin',
    'nomCompletChantier',
    'nomCompletResponsable',
    'commantaire',
    'ActionChantier',
  ];
  static TACHE_DISPLAY_COLUMNS_NAME: string[] = [
    'Libellé',
    'Date de début',
    'Date de fin',
    'Heure de debut',
    'Heure de fin',
    'Chantier',
    'Résponsable',
    'Commantaire',
    'Actions',
  ];

  /**
   * Feuille Temps Data Tables Structures
   */

  static FEUILLE_DISPLAY_COLUMNS: string[] = [
    'reference',
    'typeTravaux',
    'jourSemaine',
    'heureTravaille',
    'vehicule',
    'idCollaborateur',
    'idChantier',
    'ActionChantier',
  ];
  static FEUILLE_DISPLAY_COLUMNS_NAME: string[] = [
    'Réference',
    'Type Travaux',
    'Date',
    'Nombre Heure Travaillé',
    'Véhicule',
    'Collaborateur',
    'Chantier',
    'Actions',
  ];

  /**
   * AFFECTATION Data Tables Structures
   */

  static AFFECTATION_DISPLAY_COLUMNS: string[] = [
    'idCollaborateur',
    'idTache',
    'dateDebut',
    'dateFin',
    'heureDebut',
    'heureFin',
    'nomCompletChantier',
    'nomCompletResponsable',
    'commantaire',
    'ActionChantier',
  ];
  static AFFECTATION_DISPLAY_COLUMNS_NAME: string[] = [
    'Collaborateur',
    'Tache',
    'Date de début',
    'Date de fin',
    'Heure de debut',
    'Heure de fin',
    'Chantier',
    'Résponsable',
    'Commantaire',

    'Actions',
  ];

  /**
   * Conge Data Tables Structures
   */

  static CONGE_DISPLAY_COLUMNS: string[] = [
    'reference',
    'nomCompletEmploye',
    'dateDebut',
    'dateFin',
    'heureDebut',
    'heureFin',
    'dateDepot',
    'typeConge',
    'statut',
    'ActionChantier',
  ];
  static CONGE_DISPLAY_COLUMNS_NAME: string[] = [
    'Réference',
    'Salarié(e)',
    'Date de début',
    'Date de fin',
    'Heure de debut',
    'Heure de fin',
    'Date de dépot',
    'Type de congé',
    'Statut',
    'Actions',
  ];

  /**
   * Note Frais Data Tables Structures
   */

  static NOTE_DISPLAY_COLUMNS: string[] = [
    'reference',
    'typeNote',
    'dateNote',
    'idCollaborateur',
    'ActionChantier',
  ];
  static NOTE_DISPLAY_COLUMNS_NAME: string[] = [
    'Réference',
    'Type Note de frais',
    'Date Note',
    'Collaborateur',
    'Actions',
  ];

  /**
   * Tache Data Tables Structures
   */

  static COLLABORATEUR_DISPLAY_COLUMNS: string[] = [
    'nom',
    'prenom',
    'fonction',
    'dateEmbauche',
    'email',
    'dateNaissance',
    'adresse',
    'telephone',
    'username',
    'role',
    'ActionChantier',
  ];
  static COLLABORATEUR_DISPLAY_COLUMNS_NAME: string[] = [
    'Nom',
    'Prenom',
    'Fonction',
    'Date Embauche',
    'Email',
    'Date Naissance',
    'Adresse',
    'Téléphone',
    'Username',
    'Role',
    'Actions',
  ];
}
