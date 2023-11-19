import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pilpose',
  templateUrl: './pilpose.component.html',
  styleUrls: ['./pilpose.component.css']
})
export class PilposeComponent implements OnInit {
 imageUrl : string = "assets/img/pilposepic.jpeg";
  constructor() { }

  ngOnInit(): void {
  }

}
