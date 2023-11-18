import { UserLdapModel } from './../../model/UserLdapModel';
import { Component, OnInit } from '@angular/core';
import { SofappsHomeService } from './sofapps-home.service';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { LoginService } from 'src/app/login/login.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sofapps-home',
  templateUrl: './sofapps-home.component.html',
  styleUrls: ['./sofapps-home.component.css'],
})
export class SofappsHomeComponent implements OnInit {
  fullName = JSON.parse(localStorage.getItem('currentUser'))?.nom_complet;
  UserName = JSON.parse(localStorage.getItem('currentUser'))?.user_name;

  ldap: UserLdapModel;
  isActif: string;

  constructor(
    private sofappsHomeService: SofappsHomeService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sofappsHomeService.getinfoFromLdap(this.UserName);
    this.getInformationLdap(this.UserName);
  }

  /**
   * Methode qui appel au service pour récupérer info collab depuis ldap
   * @param UserName
   */
  getInformationLdap(UserName) {
    this.sofappsHomeService
      .getinfoFromLdap(UserName)
      .subscribe((resp: UserLdapModel) => {
        this.ldap = resp;
        this.isActif = resp.isLocked ? 'Compte Verouillé' : 'Compte Actif';
      });
  }

  /** message de déconnexion */
  logout() {
    const dialogDecnx = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Déconnexion',
        message: 'Voulez-vous vraiment quitter Sofapps ?',
        buttonText: {
          ok: 'Oui',
          cancel: 'Non',
        },
      },
      panelClass: 'confirmation-popup',
    });
    dialogDecnx.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.loginService.logout();
      }
    });
  }
}
