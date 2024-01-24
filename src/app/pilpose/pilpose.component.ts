import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCompteComponent } from './comptes/add-compte/add-compte.component';

@Component({
  selector: 'app-pilpose',
  templateUrl: './pilpose.component.html',
  styleUrls: ['./pilpose.component.css'],
})
export class PilposeComponent implements OnInit {
  imageUrl: string = 'assets/img/pilposepic.jpeg';
  firstname: string;
  admin : boolean;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {

    if(localStorage.getItem('currentUser') == null){

      this.redirectToLogin()
    
    }

    if (
      localStorage.getItem('nom') != null &&
      localStorage.getItem('prenom') != null && localStorage.getItem('admin') != null
    ) {
      this.firstname = localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom');
      const adminString: string | null = localStorage.getItem('admin');

      if (adminString !== null) {
        this.admin = JSON.parse(adminString);
    }

    }
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


  redirectToClients() {
    this.router.navigate(['pilpose/clients']);
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
    this.router.navigate(['pilpose/plannig']);
  }
  redirectToAllPlanning() {
    this.router.navigate(['pilpose/plannig']);

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

  redirectChangepWD(){
    this.router.navigate(['/change-pwd']);

  }

  logout(){

    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('idUser');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('fonction');
    localStorage.removeItem('admin');
    this.router.navigate(['/login']);

  }



}
