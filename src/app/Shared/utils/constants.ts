
export class Constants {

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

}
