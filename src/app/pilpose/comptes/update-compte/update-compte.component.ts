import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { UpdateChantierComponent } from '../../chantier/update-chantier/update-chantier.component';
import { AddCompteService } from '../add-compte/addCompte.service';

@Component({
  selector: 'app-update-compte',
  templateUrl: './update-compte.component.html',
  styleUrls: ['./update-compte.component.css'],
})
export class UpdateCompteComponent implements OnInit {
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
  }

  ngOnInit(): void {
    console.log('++++++s++++++', this.CompteToAlter);
    this.CompteForm = this.formBuilder.group({
      idCollaborateur: new UntypedFormControl(this.CompteToAlter.idChantier),
      nom: new UntypedFormControl(this.CompteToAlter.nom, Validators.required),
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
        this.CompteToAlter.dateNaissance,
        Validators.required
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

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    let compte;
    let nom: String = this.CompteForm.get('nom').value;
    let prenom: String = this.CompteForm.get('prenom').value;
    let username: String = this.CompteForm.get('username').value;
    let password: String = this.CompteForm.get('password').value;
    let role: String = this.CompteForm.get('role').value;
    let dateNaissance: String = this.CompteForm.get('dateNaissance').value;
    let email: String = this.CompteForm.get('email').value;
    let fonction: String = this.CompteForm.get('fonction').value;
    let telephone: String = this.CompteForm.get('telephone').value;
    let adresse: String = this.CompteForm.get('adresse').value;
    let dateEmbauche: String = this.CompteForm.get('dateEmbauche').value;

    compte = new Collaborateur();

    compte.idCollaborateur = this.CompteToAlter.id;
    (compte.nom = nom),
      (compte.prenom = prenom),
      (compte.fonction = fonction),
      (compte.dateEmbauche = dateEmbauche),
      (compte.email = email),
      (compte.dateNaissance = dateNaissance),
      (compte.adresse = adresse),
      (compte.telephone = telephone),
      (compte.username = username),
      (compte.role = role),
      (compte.password = password),
      this.router.navigate(['pilpose/comptes']);
    this.sendDataToUpdate(compte);
  }

  sendDataToUpdate(data: Collaborateur) {
    this.dialogRef.close(data);
  }
  close() {
    this.dialogRef.close();
  }
}
