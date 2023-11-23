import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { chantier } from 'src/app/model/chantier.model';
import { ChantierService } from 'src/app/pilpose/chantier/chantier.service';


@Component({
  selector: 'app-add-chantier',
  templateUrl: './add-chantier.component.html',
  styleUrls: ['./add-chantier.component.css']
})
export class AddChantierComponent implements OnInit {

  ChantierForm: FormGroup;
  constructor(private  chantierService:ChantierService) { }

  ngOnInit(): void {
  }

  add(){
    
    let Chantier = new chantier(
this.ChantierForm.get("codechantier").value,
this.ChantierForm.get("nomclient").value,
this.ChantierForm.get("localisation").value,
);
this.chantierService.addOrUpdateChantier(Chantier)

  }

}
