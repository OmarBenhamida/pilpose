import { Component, OnInit } from '@angular/core';
import { AccueilPageService } from './accueil-page.service';

@Component({
  selector: 'app-acceuil-page',
  templateUrl: './acceuil-page.component.html',
  styleUrls: ['./acceuil-page.component.css'],
})
export class AcceuilPageComponent implements OnInit {
  firstname: string;
  fonctionUserConnected: string;
  congeCount: number;
  feuilleCount: number;
  constructor(public accueilPageService: AccueilPageService) {}

  ngOnInit(): void {
    this.fonctionUserConnected = localStorage.getItem('fonction');
    this.firstname =
      localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom');

    this.getModelData();
  }

  getModelData() {
    if (this.fonctionUserConnected === 'Gérant') {
      this.accueilPageService
        .getCountConge()
        .then((res) => {
          this.congeCount = res;
        })
        .catch((err) => {});

      this.accueilPageService
        .getCountFeuille()
        .then((res) => {
          this.feuilleCount = res;
        })
        .catch((err) => {});
    } else if (this.fonctionUserConnected === "Chef d'équipe") {
      this.congeCount = 0;

      this.accueilPageService
        .getCountFeuilleCE()
        .then((res) => {
          this.feuilleCount = res;
        })
        .catch((err) => {});
    } else if (this.fonctionUserConnected === 'Responsable travaux') {
      this.accueilPageService
        .getCountCongeRT()
        .then((res) => {
          this.congeCount = res;
        })
        .catch((err) => {});

      this.accueilPageService
        .getCountFeuilleRT()
        .then((res) => {
          this.feuilleCount = res;
        })
        .catch((err) => {});
    } else {
      this.congeCount = 0;
      this.feuilleCount = 0;
    }
  }
}
