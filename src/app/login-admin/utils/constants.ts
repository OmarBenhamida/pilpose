import { IndividualConfig } from "ngx-toastr";

export class Constants {
  public static readonly LANGS: any[] = [
    { code: "fr", libelle: "Francais" },
    { code: "en", libelle: "English" },
  ];
  public static readonly DEFAULT_LANG: string = "fr";
  public static readonly I18N_PATH: string = "assets/i18n";

  public static toastOptions: Partial<IndividualConfig> = {
    closeButton: true,
    timeOut: 7000,
    progressBar: true,
    progressAnimation: 'decreasing',
    extendedTimeOut: 700,
  };

}
