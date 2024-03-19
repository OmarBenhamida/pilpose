import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/model/chantier.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { AddCompteService } from './addCompte.service';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.css'],
})
export class AddCompteComponent implements OnInit {
  CompteForm: UntypedFormGroup;
  hashedPassword: string;
  constructor(
    private router: Router,
    private compteService: AddCompteService,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.CompteForm = this.formBuilder.group({
      idCollaborateur: new UntypedFormControl(''),
      nom: new UntypedFormControl('', Validators.required),
      prenom: new UntypedFormControl('', Validators.required),
      username: new UntypedFormControl('', Validators.required),
      dateEmbauche: new UntypedFormControl('', Validators.required),
      dateNaissance: new UntypedFormControl(''),
      email: new UntypedFormControl('', Validators.required),
      fonction: new UntypedFormControl('', Validators.required),
      role: new UntypedFormControl('', Validators.required),
      adresse: new UntypedFormControl('', Validators.required),
      telephone: new UntypedFormControl('', Validators.required),
    });
  }


 /* hashPassword(password: string): String {

    this.hashedPassword = CryptoJS.SHA256(password).toString();
   
    return this.hashedPassword;
  }*/

  onSubmit() {
    let nom: String = this.CompteForm.get('nom').value;
    let prenom: String = this.CompteForm.get('prenom').value;
    let username: String = this.CompteForm.get('username').value;
    let dateNaissance: String = this.CompteForm.get('dateNaissance').value;
    let dateEmbauche: String = this.CompteForm.get('dateEmbauche').value;
    let email: String = this.CompteForm.get('email').value;
    let fonction: String = this.CompteForm.get('fonction').value;
    let role: String = this.CompteForm.get('role').value;
    let adresse: String = this.CompteForm.get('adresse').value;
    let telephone: String = this.CompteForm.get('telephone').value;

    let collab = new Collaborateur();
    collab.idCollaborateur = null;
    collab.prenom = prenom;
    collab.username = username;
    collab.nom = nom;
    collab.password = "password";
    collab.dateNaissance = dateNaissance;
    collab.dateEmbauche =dateEmbauche;
    collab.email = email;
    collab.role = role;
    collab.fonction = fonction;
    collab.adresse = adresse;
    collab.telephone = telephone;

    this.compteService
      .addOrUpdateCollab(collab)
      .then((res) => {
        this.toast.success(
          this.translate.instant('collaborateur ajouté avec succés'),
          '',
          Constants.toastOptions
        );
        //this.router.navigate(['pilpose/comptes']);
        window.location.reload();
      })
      .catch((error) => {
        this.toast.error(
          this.translate.instant(
            'Erreur lors de la création d un collaborateur'
          ),
          '',
          Constants.toastOptions
        );
      });
  }
}
