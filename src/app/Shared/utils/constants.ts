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
    'client',
    'localisationDto',
    'etat',
    'ActionChantier',
  ];
  static CHANTIER_DISPLAY_COLUMNS_NAME: string[] = [
    'TABLES.CHANTIER.REFERENCE',
    'TABLES.CHANTIER.CLIENT',
    'TABLES.CHANTIER.LOCALISATION',
    'TABLES.CHANTIER.ETAT',
    'Actions',
  ];

  /**
   * Tache Data Tables Structures
   */

  static TACHE_DISPLAY_COLUMNS: string[] = [
    'reference',
    'libelle',
    'dateDebut',
    'dateFin',
    'heureDebut',
    'heureFin',
    'idChantier',
    'commantaire',
    'ActionChantier',
  ];
  static TACHE_DISPLAY_COLUMNS_NAME: string[] = [
    'Réference',
    'Libelle',
    'Date Début',
    'Date Fin',
    'Heure Debut',
    'Heure Fin',
    'Chantier',
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
    'ActionChantier',
  ];
  static AFFECTATION_DISPLAY_COLUMNS_NAME: string[] = [
    'Collaborateur',
    'Tache',
    'Actions',
  ];

  /**
   * Conge Data Tables Structures
   */

  static CONGE_DISPLAY_COLUMNS: string[] = [
    'reference',
    'idCollaborateur',
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
    'Collaborateur',
    'Date Début',
    'Date Fin',
    'Heure Debut',
    'Heure Fin',
    'Date Dépot',
    'Type Conge',
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
    'cin',
    'nationalite',
    'dateNaissance',
    'adresse',
    'telephone',
    'username',
    'ActionChantier',
  ];
  static COLLABORATEUR_DISPLAY_COLUMNS_NAME: string[] = [
    'Nom',
    'Prenom',
    'Fonction',
    'Date Embauche',
    'Email',
    'CIN',
    'Nationalite',
    'Date Naissance',
    'Adresse',
    'Téléphone',
    'Username',
    'Actions',
  ];
}
