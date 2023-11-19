import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class SnackBarNotifService {
  durationInSeconds = 5;
  constructor(
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}
  /**
   *
   * @param message
   * @param action
   */
  openSnackBarSuccess(message: string, action: string) {
    action = this.translate.instant(action);
    message = this.translate.instant(message);
    this._snackBar.open(message, action, {
      duration: 10000,
      panelClass: "oppenSnackBarSuccessClass",
    });
  }
  /**
   * Function to show Primary SnackBar when selecting days
   *
   * @param message
   * @param action
   */
  openSnackBarPrimary(message: string, action: string) {
    action = this.translate.instant(action);
    message = this.translate.instant(message);
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: "oppenSnackBarPrimaryClass",
    });
  }
  /**
   * Function to show Failure SnackBar when canceling demande or selection of wrong dates
   *
   * @param message
   * @param action
   */
  openSnackBarFailure(message: string, action: string) {
    action = this.translate.instant(action);
    message = this.translate.instant(message);
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: "oppenSnackBarFailureClass",
    });
  }
}
