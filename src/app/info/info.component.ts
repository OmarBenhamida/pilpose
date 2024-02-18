import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  fullName = JSON.parse(localStorage.getItem('currentUser'))?.nom_complet;


  ngOnInit(): void {
    
  }
}
