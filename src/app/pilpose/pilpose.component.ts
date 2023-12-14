import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pilpose',
  templateUrl: './pilpose.component.html',
  styleUrls: ['./pilpose.component.css']
})
export class PilposeComponent implements OnInit {
  imageUrl: string = "assets/img/pilposepic.jpeg";
  firstname: string;
  constructor(private router: Router,) { }

  ngOnInit(): void {

    if(localStorage.getItem('nom') != null && localStorage.getItem('prenom') != null ) {
      this.firstname = localStorage.getItem('nom') + " " +localStorage.getItem('prenom');
    
    }
  }

  redirectToListChantier() {
    this.router.navigate(['pilpose/chantier']);

  }

  redirectToComptes() {
    this.router.navigate(['pilpose/comptes']);

  }

  redirectToNewChantier() {
    this.router.navigate(['pilpose/add-chantier']);

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

  redirectAddConge(){
    this.router.navigate(['pilpose/add-conge']);
  }

  redirectInfoCollab(){
    this.router.navigate(['pilpose/info-collab']);
  }
  redirectAddNote(){
    this.router.navigate(['pilpose/add-note']);
  }

  redirectAffectation(){
    this.router.navigate(['pilpose/affectation']);
  }
}
