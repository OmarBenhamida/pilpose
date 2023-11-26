import { IndividualConfig } from "ngx-toastr";

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
    'Action',
  ];

  /**
   * Chantier Data Tables Structures
   */

  static TACHE_DISPLAY_COLUMNS: string[] = [
    'numero',
    'intitule',
    'dateDebut',
    'DateFin',
    'Heuredebut',
    'Heurefin',
    'type',
    'action',

  ];
  static TACHE_DISPLAY_COLUMNS_NAME: string[] = [
    'numero',
    'intitule',
    'dateDebut',
    'DateFin',
    'Heuredebut',
    'Heurefin',
    'type',
    'action',
  ];

}
