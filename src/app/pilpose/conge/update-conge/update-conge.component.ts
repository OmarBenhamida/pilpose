import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/model/chantier.model';
import { Client } from 'src/app/model/client.model';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Conge } from 'src/app/model/conge.model';
import { Localisation } from 'src/app/model/localisation.model';
import { CompteService } from '../../comptes/compte.service';
import { AddCongeService } from '../add-conge/addConge.service';

@Component({
  selector: 'app-update-conge',
  templateUrl: './update-conge.component.html',
  styleUrls: ['./update-conge.component.css'],
})
export class UpdateCongeComponent implements OnInit {
  CongeForm: UntypedFormGroup;
  CongeToAlter: any;
  salaries: Collaborateur[] = [];
  idCollaborateur: Collaborateur;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateCongeComponent>,
    private compteService: CompteService,
    public toastr: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.CongeToAlter = this.data.conge;
  }

  ngOnInit(): void {
    this.getAllCollab();
    console.log('++++++******++++++', this.CongeToAlter);

    this.CongeForm = this.formBuilder.group({
      idConge: new UntypedFormControl(this.CongeToAlter.idConge),
      reference: new UntypedFormControl(this.CongeToAlter.reference,Validators.required),
      statut: new UntypedFormControl(this.CongeToAlter.statut,Validators.required ),
      dateDebut: new UntypedFormControl(this.CongeToAlter.dateDebut,Validators.required),
      dateFin: new UntypedFormControl(this.CongeToAlter.dateFin,Validators.required),
      heureDebut: new UntypedFormControl(this.CongeToAlter.heureDebut,Validators.required),
      heureFin: new UntypedFormControl(this.CongeToAlter.heureFin,Validators.required),
      typeConge: new UntypedFormControl(this.CongeToAlter.typeConge,Validators.required),
      idCollaborateur: new UntypedFormControl(this.CongeToAlter.idCollaborateur.idCollaborateur,Validators.required ),
    });
  }
  getAllCollab() {
    this.compteService
      .getAllComptes()
      .then((res: Collaborateur[]) => {
     

        for (let compte of res) {
         

          this.salaries.push({
            idCollaborateur: compte.idCollaborateur,
            nom: compte.nom,
            prenom: compte.prenom,
            fonction: compte.fonction,
            dateEmbauche: compte.dateEmbauche,
            email: compte.email,
            dateNaissance: compte.dateNaissance,
            adresse: compte.adresse,
            telephone: compte.telephone,
            username: compte.username,
            password: compte.password,
            role: compte.role,
          });
        }
      })
      .catch((err) => {});
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    let conge;

    let statut = this.CongeForm.get('statut').value;
    let dateDebut: Localisation = this.CongeForm.get('dateDebut').value;
    let dateFin: String = this.CongeForm.get('dateFin').value;
    let heureDebut: String = this.CongeForm.get('heureDebut').value;
    let heureFin = this.CongeForm.get('heureFin').value;
    let typeConge = this.CongeForm.get('typeConge').value;
    let idCollaborateur = this.CongeForm.get('idCollaborateur').value;

    conge = new Conge();

    conge.idConge = this.CongeToAlter.idConge;
    conge.reference = null;
    conge.statut = statut;
    conge.dateDebut = dateDebut;
    conge.dateFin = dateFin;
    conge.dateDepot = this.CongeToAlter.dateDepot;
    conge.heureDebut = heureDebut;
    conge.heureFin = heureFin;
    conge.typeConge = typeConge;

    let collab: Collaborateur = {
      idCollaborateur: idCollaborateur,
    };
    conge.idCollaborateur = collab;

    this.router.navigate(['pilpose/conge']);
    console.log('log to alter ', conge);

    this.sendDataToUpdate(conge);
  }

  sendDataToUpdate(data: Chantier) {
    this.dialogRef.close(data);
  }
  close() {
    this.dialogRef.close();
  }
}
