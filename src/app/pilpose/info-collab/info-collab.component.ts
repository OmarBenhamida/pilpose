import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { disable } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/model/chantier.model';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Conge } from 'src/app/model/conge.model';
import { Localisation } from 'src/app/model/localisation.model';
import { environment } from 'src/environments/environment';
import { UpdateChantierComponent } from '../chantier/update-chantier/update-chantier.component';
import { AddCompteService } from '../comptes/add-compte/addCompte.service';
import { CompteService } from '../comptes/compte.service';
import { UpdateCongeComponent } from '../conge/update-conge/update-conge.component';

@Component({
  selector: 'app-info-collab',
  templateUrl: './info-collab.component.html',
  styleUrls: ['./info-collab.component.css']
})
export class InfoCollabComponent implements OnInit {
  CompteForm: UntypedFormGroup;
  CompteToAlter: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateChantierComponent>,
    private collaborateurService: AddCompteService,
    public toastr: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.CompteToAlter = this.data.compte;

    console.log("this.CompteToAlter" , this.CompteToAlter);
    
  }

  ngOnInit(): void {
   
    this.CompteForm = this.formBuilder.group({
      idCollaborateur: new UntypedFormControl(this.CompteToAlter.idChantier),
      nom: new UntypedFormControl(this.CompteToAlter.nom, Validators.required,),
      prenom: new UntypedFormControl(
        this.CompteToAlter.prenom,
        Validators.required
      ),
      username: new UntypedFormControl(
        this.CompteToAlter.username,
        Validators.required
      ),
      password: new UntypedFormControl(
        this.CompteToAlter.password,
        Validators.required
      ),
      role: new UntypedFormControl(
        this.CompteToAlter.role,
        Validators.required
      ),
      dateNaissance: new UntypedFormControl(
        this.CompteToAlter.dateNaissance
      ),
      email: new UntypedFormControl(
        this.CompteToAlter.email,
        Validators.required
      ),
      fonction: new UntypedFormControl(
        this.CompteToAlter.fonction,
        Validators.required
      ),
      telephone: new UntypedFormControl(
        this.CompteToAlter.telephone,
        Validators.required
      ),
      adresse: new UntypedFormControl(
        this.CompteToAlter.adresse,
        Validators.required
      ),
      dateEmbauche: new UntypedFormControl(
        this.CompteToAlter.dateEmbauche,
        Validators.required
      ),
    });
  }

 


  close() {
    this.dialogRef.close();
  }
}
