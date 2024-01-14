import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../components/sirhus-popups/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {

  private dialogRef;

  constructor(public dialog: MatDialog, public router: Router) {
  }

  /**
   * get popup generic
   */
  getPopup() {
    let oldUserCurrent = localStorage.getItem("currentUser");
    let currentDate = new Date();
    let expireDate = new Date(JSON.parse(oldUserCurrent).token_dto.expires);
    let seconds = (expireDate.getTime() - currentDate.getTime()) / 1000;
    if (seconds < 0) {
      this.createRefreshToken();
      this.dialogRef = this.dialog.open(ConfirmationComponent, {
        disableClose: true,
        data: {
          title: 'Session Expirée',
          message: 'Votre session est expirée',
          buttonText: {
            ok: 'Restaurer la session',
            cancel: 'Fermer la session'
          }
        },
        panelClass: 'confirmation-popup'
      });

      this.dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          // window.location.reload();
        } else {
          this.router.navigate(['']);
          localStorage.clear();
        }
      });
    }
  }

  setTimeoutVars() {
    this.getPopup();
  }

  createRefreshToken() {
    /**
       * create new token
       */
    let oldUserCurrent = localStorage.getItem("currentUser");
    if (JSON.parse(oldUserCurrent).token_dto.refresh) {
      let newCurrentUser = {
        user_name: null,
        nom_complet: null,
        token_dto: {
          header: null,
          expires: null,
          token: null,
          id: null
        }
      }
      let newToken = JSON.parse(oldUserCurrent).token_dto.refresh;
      let newExpires = JSON.parse(oldUserCurrent).token_dto.expiresRefresh;
      let header = JSON.parse(oldUserCurrent).token_dto.header;
      let username = JSON.parse(oldUserCurrent).user_name;
      let nom_complet = JSON.parse(oldUserCurrent).nom_complet;
      let id = JSON.parse(oldUserCurrent).token_dto.id;

      newCurrentUser.user_name = username;
      newCurrentUser.nom_complet = nom_complet;
      newCurrentUser.token_dto.expires = newExpires;
      newCurrentUser.token_dto.header = header;
      newcurrentUser.token_dto?.token = newToken;
      newCurrentUser.token_dto.id = id;
      localStorage.setItem("currentUser", JSON.stringify(newCurrentUser));
    } else {
      this.dialogRef.close();
    }
  }

}
