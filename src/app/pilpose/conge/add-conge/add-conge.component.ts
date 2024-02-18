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
import { AddCongeService } from './addConge.service';
import { Conge } from 'src/app/model/conge.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { CompteService } from '../../comptes/compte.service';

@Component({
  selector: 'app-add-conge',
  templateUrl: './add-conge.component.html',
  styleUrls: ['./add-conge.component.css'],
})
export class AddCongeComponent implements OnInit {
  salaries: Collaborateur[] = [];
  idCollaborateur: Collaborateur;

  CongeForm: UntypedFormGroup;
  constructor(
    private router: Router,
    private congeService: AddCongeService,
    public toast: ToastrService,
    public translate: TranslateService,
    private compteService: CompteService,
    public formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllCollab();
    this.CongeForm = this.formBuilder.group({
      idConge: new UntypedFormControl(''),
      dateDebut: new UntypedFormControl('', Validators.required),
      dateFin: new UntypedFormControl('', Validators.required),
      heureDebut: new UntypedFormControl('', Validators.required),
      heureFin: new UntypedFormControl('', Validators.required),
      typeconge: new UntypedFormControl('', Validators.required),
      idCollaborateur: new UntypedFormControl('', Validators.required),
      commentaire: new UntypedFormControl('', Validators.required),
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

  onSubmit() {
    let dateDebut: String = this.CongeForm.get('dateDebut').value;
    let dateFin: String = this.CongeForm.get('dateFin').value;
    let heureDebut: number = this.CongeForm.get('heureDebut').value;
    let heureFin: number = this.CongeForm.get('heureFin').value;
    let typeconge: String = this.CongeForm.get('typeconge').value;
    let idSalarie = this.CongeForm.get('idCollaborateur').value;
    let commantaire: String = this.CongeForm.get('commentaire').value;
    let etat: String = 'En cours';
    let iduser: number = Number(localStorage.getItem('idUser'));
    let conge = new Conge();
    conge.idConge = null;

    conge.dateDebut = dateDebut;
    conge.dateFin = dateFin;
    conge.heureDebut = heureDebut;
    conge.heureFin = heureFin;
    conge.typeConge = typeconge;
    conge.statut = etat;
    conge.commantaire = commantaire;

    conge.validationChefEquipe = false;
    conge.validationGerant = false;
    conge.validationResponsableAdministratif = false;
    conge.validationResponsableTravaux = false;

    let idCollaborateur: Collaborateur = {
      idCollaborateur: idSalarie,
    };

    conge.idCollaborateur = idCollaborateur;
    this.congeService
      .addOrUpdateConge(conge)
      .then((res) => {
        this.toast.success(
          this.translate.instant('Demande ajoutée avec succés'),
          '',
          Constants.toastOptions
        );
        this.router.navigate(['pilpose/conge']);
      })
      .catch((error) => {
        this.toast.error(
          this.translate.instant(
            'Erreur lors de la création d une demande de conge'
          ),
          '',
          Constants.toastOptions
        );
      });
  }
}
