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

  public static EXCEL_XLS: string = 'application/vnd.ms-excel';
  public static EXCEL_CSV: string = 'text/csv';

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
    'ville',
    'nomChantier',
    'reference',
    'nomCompletClient',
    'etat',
    'ActionChantier',
  ];
  static CHANTIER_DISPLAY_COLUMNS_NAME: string[] = [
    'TABLES.CHANTIER.LOCALISATION',
    'Nom du chantier',
    'TABLES.CHANTIER.REFERENCE',
    'TABLES.CHANTIER.CLIENT',
    'TABLES.CHANTIER.ETAT',
    'Actions',
  ];

  /**
   * client Data Tables Structures
   */

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
   * Locqlisqtion Data Tables Structures
   */

     static LOCALISATION_DISPLAY_COLUMNS: string[] = [
      'ville',
      'codePostale',

      'ActionChantier',
    ];
    static LOCALISATION_DISPLAY_COLUMNS_NAME: string[] = [
      'Commune',
      'Code postale',

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
    'nomCompletClient',
    'ville',

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
    'Client',
    'Ville',

    'Actions',
  ];

  static CHANTIER_RECAP_DISPLAY_COLUMNS: string[] = [
    'reference',
    'nomChantier',
    'ville',
    'etat',
    'totalHeuresTravaille',
  ];
  static CHANTIER_RECAP_DISPLAY_COLUMNS_NAME: string[] = [
    'Référence',
    'Chantier',
    'Localisation',
    'Etat',
    'Total Nombre d heures',
  ];

  static SALARIE_RECAP_DISPLAY_COLUMNS: string[] = [
    'nomCompletResponsable',
    'totalHeuresTravaille',
  ];
  static SALARIE_RECAP_DISPLAY_COLUMNS_NAME: string[] = [
    'Salarié',
    'Total Nombre d heures',
  ];

  /**
   * Feuille Temps Data Tables Structures
   */

  static FEUILLE_DISPLAY_COLUMNS: string[] = [
    'typeTravaux',
    'jourSemaine',
    'heureTravaille',
    'vehicule',
    'km',

    'nomCompletResponsable',
    'nomCompletChantier',
    'nomCompletSalarie',
    'nomCompletClient',
    'ville',
    'ActionChantier',
  ];
  static FEUILLE_DISPLAY_COLUMNS_NAME: string[] = [
    'Type Travaux',
    'Date',
    'Nombre Heure Travaillé',
    'Véhicule',
    'Kilométrage',

    'Responsable',
    'Chantier',
    'Salarié',
    'Client',
    'Ville',
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
    'Salarié(e)',
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
    'nomCompletEmploye',
    'statut',
    'ActionChantier',
  ];
  static NOTE_DISPLAY_COLUMNS_NAME: string[] = [
    'Réference',
    'Type note de frais',
    'Date de la note',
    'Salarié(e)',
    'Statut',
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
    'Prénom',
    'Fonction',
    'Date Embauche',
    'Email',
    'Date Naissance',
    'Adresse',
    'Téléphone',
    'Username',
    'Rôle',
    'Actions',
  ];
}
