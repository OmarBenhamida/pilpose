import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../login-admin/utils/constants';
import { Collaborateur } from '../model/collaborateur.model';
import { AddCompteComponent } from './comptes/add-compte/add-compte.component';
import { AddCompteService } from './comptes/add-compte/addCompte.service';
import { CompteService } from './comptes/compte.service';
import { InfoCollabComponent } from './info-collab/info-collab.component';

@Component({
  selector: 'app-pilpose',
  templateUrl: './pilpose.component.html',
  styleUrls: ['./pilpose.component.css'],
})
export class PilposeComponent implements OnInit {
  imageUrl: string = 'assets/img/pilposepic.jpeg';
  firstname: string;
  fonctionUserConnected: string;
  admin: boolean;
  model: Collaborateur;

  constructor(
    private router: Router,
    public translate: TranslateService,
    public toastr: ToastrService,
    private compteService: CompteService,
    private addCompteService: AddCompteService,
    private dialog: MatDialog,

    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.fonctionUserConnected = localStorage.getItem('fonction');

    this.getCollaborateurById();

    if (localStorage.getItem('currentUser') == null) {
      this.redirectToLogin();
    }

    if (
      localStorage.getItem('nom') != null &&
      localStorage.getItem('prenom') != null &&
      localStorage.getItem('admin') != null
    ) {
      this.firstname =
        localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom');
      const adminString: string | null = localStorage.getItem('admin');

      if (adminString !== null) {
        this.admin = JSON.parse(adminString);
      }
    }

    console.log('##########', this.model);
  }

  getCollaborateurById() {
    this.compteService
      .getCompteById(localStorage.getItem('idUser'))
      .then((res: Collaborateur) => {
        this.model = new Collaborateur();

        this.model.idCollaborateur = res.idCollaborateur;
        (this.model.nom = res.nom),
          (this.model.prenom = res.prenom),
          (this.model.fonction = res.fonction),
          (this.model.dateEmbauche = res.dateEmbauche),
          (this.model.email = res.email),
          (this.model.dateNaissance = res.dateNaissance),
          (this.model.adresse = res.adresse),
          (this.model.telephone = res.telephone),
          (this.model.username = res.username),
          (this.model.password = res.password),
          (this.model.role = res.role);
      })
      .catch((err) => {});
  }

  openAlterModelPopup() {
    const dialogRef = this.dialog.open(InfoCollabComponent, {
      width: '60vw',
      height: '90vh',
      data: {
        compte: this.model,
      },
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.redirectToPlanning();
    });
  }

  isCE(): boolean {
    return this.fonctionUserConnected === "Chef d'équipe";
  }

  isGerant(): boolean {
    return this.fonctionUserConnected === 'Gérant';
  }

  isRT(): boolean {
    return this.fonctionUserConnected === 'Responsable de travaux';
  }

  isRA(): boolean {
    return this.fonctionUserConnected === 'Responsable administratif';
  }

  openNewCompte(): void {
    const dialogRef = this.dialog.open(AddCompteComponent, {
      width: '750px',
      height: '80vh', // Adjust width as needed
      // Other configuration options like height, data, etc.
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  redirectToListChantier() {
    this.router.navigate(['pilpose/chantier']);
  }

  redirectToComptes() {
    this.router.navigate(['pilpose/comptes']);
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToAllAccueil(){

    this.router.navigate(['pilpose/accueil']);
  }

  redirectToClients() {
    this.router.navigate(['pilpose/clients']);
  }
  redirectToCommunes() {
    this.router.navigate(['pilpose/communes']);
  }
  redirectToNewCommunes() {
    this.router.navigate(['pilpose/add-commune']);
  }

  redirectToNewChantier() {
    this.router.navigate(['pilpose/add-chantier']);
  }

  redirectToListFeuille() {
    this.router.navigate(['pilpose/feuilles']);
  }

  redirectToNewFeuille() {
    this.router.navigate(['pilpose/add-feuille']);
  }

  redirectToNewClient() {
    this.router.navigate(['pilpose/add-client']);
  }

  redirectToTacheListe() {
    this.router.navigate(['pilpose/tache']);
  }

  redirectAddTache() {
    this.router.navigate(['pilpose/add-tache']);
  }

  redirectToNoteListe() {
    this.router.navigate(['pilpose/note']);
  }

  redirectToCongeListe() {
    this.router.navigate(['pilpose/conge']);
  }

  redirectToPlanning() {
    this.router.navigate(['pilpose/planning']);
  }
  redirectToAllPlanning() {
    this.router.navigate(['pilpose/planning']);
  }

  redirectAddConge() {
    this.router.navigate(['pilpose/add-conge']);
  }

  redirectInfoCollab() {
    this.router.navigate(['pilpose/info-collab']);
  }
  redirectAddNote() {
    this.router.navigate(['pilpose/add-note']);
  }

  redirectAffectation() {
    this.router.navigate(['pilpose/affectation']);
  }

  redirectToTemps() {
    this.router.navigate(['pilpose/temps']);
  }

  redirectChangepWD() {
    this.router.navigate(['/change-pwd']);
  }

  logout() {
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('idUser');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('fonction');
    localStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }
}
