import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pilpose',
  templateUrl: './pilpose.component.html',
  styleUrls: ['./pilpose.component.css']
})
export class PilposeComponent implements OnInit {
 imageUrl : string = "assets/img/pilposepic.jpeg";
  constructor( private router: Router,) { }

  ngOnInit(): void {
  }

  redirectToListChantier(){
    this.router.navigate(['pilpose/chantier']);

  }

  redirectToNewChantier(){
    this.router.navigate(['pilpose/add-chantier']);

  }

  redirectToTacheListe(){
    this.router.navigate(['pilpose/tache']);

  }

  redirectAddTache(){
    this.router.navigate(['pilpose/add-tache']);
  }

  
  redirectToNoteListe(){
    this.router.navigate(['pilpose/note']);

  }

  redirectToCongeListe(){
    this.router.navigate(['pilpose/conge']);

  }

  redirectToPlanning(){
    this.router.navigate(['pilpose/plannig']);

  }

}
