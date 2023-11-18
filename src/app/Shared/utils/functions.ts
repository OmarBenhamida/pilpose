export class Functions {
  /**
   * method permet de convertir minute to hh:mm
   */
  public static timeConvert(nomberMinute) {
    let nbrHeuresOuvrees: number = 9;
    if (nomberMinute < -1) {
      nomberMinute = nomberMinute + nbrHeuresOuvrees * 60;
    }
    let num = nomberMinute;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    if (rhours < -1) {
      rhours += 8;
    }
    return rhours + "h." + rminutes + "m.";
  }

  /**
   * check is value null, undefined or empty
   * @param src
   */
  public static isNullOrEmpty(src: String): Boolean {
    return (
      src === undefined ||
      src === "undefined" ||
      src === null ||
      src === "null" ||
      src === "NULL" ||
      !src.trim() ||
      src.length === 0 ||
      src.trim().length === 0
    );
  }

  /**
   * retur la diff entre deux date en jours
   * @param date1,date2
   */
  public static getDifferenceDays(dmin: Date, dmax: Date) {
    let dateMax = dmax;
    let dateMin = dmin;
    let diff = Math.trunc(dateMax.getTime() - dateMin.getTime());
    let day = 1000 * 60 * 60 * 24;
    let days = diff / day;
    return days;
  }

  /**
   *
   * return [year,month]
   */
  public static convertDaysToYearAndMonth(days: number) {
    let diffyear = days / 365;
    let intpart = Math.trunc(diffyear);
    let decimalpart = diffyear - intpart;

    return [Math.trunc(intpart), Math.trunc(decimalpart * 12)];
  }

  /* from dd-MM-yyyy to 'MM-dd-yyyy' format*/
  public static convertToMMDdYy(date: any): Date {
    let result = null;
    if (date != null) {
      let dateDdMmYy: any = date.split("-");
      result = new Date(dateDdMmYy[2], +(dateDdMmYy[1] - 1), +dateDdMmYy[0]);
    }
    return result;
  }
  /**
   *
   * @param date
   */
  public static getCustomDate(date: string): any {
    let dateItems = date.split("-");
    let customDate = {
      day: dateItems[0],
      month: dateItems[1],
      year: dateItems[2],
    };
    return customDate;
  }

  /**
   * Convert string date to Date verion 2 width hours & Minutes
   * @param stringDate
   * @param format
   */
  public static stringToDateConverterV2(
    stringDate: string,
    format: string
  ): Date {
    let normalized = stringDate.replace(/[^a-zA-Z0-9]/g, "-");
    let normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
    let formatItems = normalizedFormat.split("-");
    let dateItems = normalized.split("-");

    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");
    let hoursIndex = formatItems.indexOf("hh");
    let minutesIndex = formatItems.indexOf("ii");
    let today = new Date();

    let year = yearIndex > -1 ? +dateItems[yearIndex] : today.getFullYear();
    let month =
      monthIndex > -1 ? +dateItems[monthIndex] - 1 : today.getMonth() - 1;
    let day = dayIndex > -1 ? +dateItems[dayIndex] : today.getDate();
    let hours = hoursIndex > -1 ? +dateItems[hoursIndex] + 1 : today.getHours();
    let minutes =
      minutesIndex > -1 ? +dateItems[minutesIndex] : today.getMinutes();
    return new Date(year, month, day, hours, minutes);
  }
  /* le délai de validation */
  public static getDelai(dateDebut: string, dateFin: string): string {
    let duree: number = 0;
    let delai: number = 0;
    if (dateDebut !== null && dateFin !== null) {
      /* convert strinf dates to Date */
      let dateDeDebut = Functions.stringToDateConverterV2(
        dateDebut,
        "dd-mm-yyyy hh:ii:ss"
      );
      let dateDeFin = Functions.stringToDateConverterV2(
        dateFin,
        "dd-mm-yyyy hh:ii:ss"
      );
      /* calucler la delai total */
      duree =
        (dateDeFin.getTime() - dateDeDebut.getTime()) / (1000 * 3600 * 24);
      /* display one number after , */
      const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
      delai = +formatter.format(duree);
      /** debut du script okourmou  */
      var start = new Date(dateDeDebut);
      var end = new Date(dateDeFin);
      // initial total
      var totalBusinessDays = 0;
      // normalize both start and end to beginning of the day
      var current = new Date(start);
      current.setDate(current.getDate() + 1);
      var day;
      // loop through each day, checking
      while (current <= end) {
        day = current.getDay();
        if (day >= 1 && day <= 5) {
          ++totalBusinessDays;
        }
        /* increment current date  */
        current.setDate(current.getDate() + 1);
      }
    }
    var dateTemp = new Date(start);
    dateTemp?.setMonth(end?.getMonth());
    dateTemp?.setDate(end?.getDate());
    let tempHourMinute = Functions.timeConvert(
      Math.round((end?.getTime() - dateTemp?.getTime()) / 60000)
    );
    return totalBusinessDays + " jour(s) " + tempHourMinute;
  }
  /* la duree totale de la demande */
  public static getCurrentDelai(dateDebut: string): number {
    let duree: number = 0;
    let delai: number = 0;
    if (dateDebut !== null) {
      /* convert strinf dates to Date */
      let dateDeDebut = Functions.stringToDateConverter(
        dateDebut,
        "dd-mm-yyyy"
      );
      let dateDeFin = new Date();
      /* calucler la delai total */
      duree =
        (dateDeFin.getTime() - dateDeDebut.getTime()) / (1000 * 3600 * 24);

      /* display one number after , */
      const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
      delai = +formatter.format(duree);
    }
    return delai;
  }
  /**
   * Convert string date to Date
   * @param stringDate
   * @param format
   */
  public static stringToDateConverter(
    stringDate: string,
    format: string
  ): Date {
    let normalized = stringDate.replace(/[^a-zA-Z0-9]/g, "-");
    let normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
    let formatItems = normalizedFormat.split("-");
    let dateItems = normalized.split("-");

    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");

    let today = new Date();

    let year = yearIndex > -1 ? +dateItems[yearIndex] : today.getFullYear();
    let month =
      monthIndex > -1 ? +dateItems[monthIndex] - 1 : today.getMonth() - 1;
    let day = dayIndex > -1 ? +dateItems[dayIndex] : today.getDate();
    return new Date(year, month, day);
  }
  /*
   * fomat datepicker to
   */
  public static getDateFormat(date: Date): string {
    let day = date.getDate();
    let dayString: string;
    let month = date.getMonth() + 1;
    let monthString: string;
    if (day < 10) {
      dayString = "0" + day;
    } else {
      dayString = day.toString();
    }

    if (month < 10) {
      monthString = "0" + month;
    } else {
      monthString = month.toString();
    }
    return dayString + "-" + monthString + "-" + date.getFullYear();
  }
  /**
   * Get date time confirmee
   *
   * @param dateTtsConfirme
   * @param HeureTtsConfirmee
   * @param MinuteTtsConfirmee
   */
  public static getDateTimeFormat(
    date: string,
    heure: string,
    minute: string
  ): string {
    let dateTimeFormat: string;
    let numberHeure: number = +heure;
    heure = (numberHeure - 1).toString();
    let dateFormat = this.getDateFormat(new Date(date));
    dateTimeFormat = dateFormat + " " + heure + ":" + minute;
    return dateTimeFormat;
  }
}
