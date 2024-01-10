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
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('nom') != null &&
      localStorage.getItem('prenom') != null
    ) {
      this.firstname =
        localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom');
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

  redirectToClients() {
    this.router.navigate(['pilpose/clients']);
  }

  redirectToNewChantier() {
    this.router.navigate(['pilpose/add-chantier']);
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
}
