import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';

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
import { Chantier } from 'src/app/model/chantier.model';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Tache } from 'src/app/model/tache.model';
import { UpdateTacheAffectation } from 'src/app/model/updateTache.model';
import { ChantierService } from '../../chantier/chantier.service';
import { CompteService } from '../../comptes/compte.service';

import { TacheService } from '../tache.service';

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrls: ['./update-tache.component.css'],
})
export class UpdateTacheComponent implements OnInit {
  TacheForm: UntypedFormGroup;
  TacheToAlter: any;
  salaries: Collaborateur[] = [];
  responsable: Collaborateur;
  salariesConcerne: Collaborateur[] = [];
  listChantiers: Chantier[] = [];
  idChantier: Chantier;

  salariesList: Collaborateur[] = [];
  selectedSalaries;
  idsCollab: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateTacheComponent>,
    private villeChantierService: ChantierService,

    public tacheService: TacheService,
    private compteService: CompteService,
    public toastr: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.TacheToAlter = this.data.tache;
  }

  ngOnInit(): void {
    this.getAllSalarieConcerne(this.TacheToAlter.idTache);

    this.getAllChantiers();
    this.getAllCollabCp();
    this.getAllCollab();

    this.TacheForm = this.formBuilder.group({
      idTache: new UntypedFormControl(this.TacheToAlter.idTache),
      typeTache: new UntypedFormControl(this.TacheToAlter.typeTache),
      intitule: new UntypedFormControl(
        this.TacheToAlter.libelle,
        Validators.required
      ),
      typeTravaux: new UntypedFormControl(
        this.TacheToAlter.typeTravaux,
        Validators.required
      ),

      dateDebut: new UntypedFormControl(
        this.TacheToAlter.dateDebut,
        Validators.required
      ),
      dateFin: new UntypedFormControl(
        this.TacheToAlter.dateFin,
        Validators.required
      ),
      heureDebut: new UntypedFormControl(
        this.TacheToAlter.heureDebut,
        Validators.required
      ),
      heureFin: new UntypedFormControl(
        this.TacheToAlter.heureFin,
        Validators.required
      ),
      commentaire: new UntypedFormControl(
        this.TacheToAlter.commantaire,
        Validators.required
      ),
      chantier: new UntypedFormControl(
        this.TacheToAlter.idChantier.idChantier,
        Validators.required
      ),
      responsable: new UntypedFormControl(
        this.TacheToAlter.responsable.idCollaborateur,
        Validators.required
      ),
      salariesAll: new UntypedFormControl(this.idsCollab, Validators.required),
    });

    this.TacheForm.get('salariesAll').setValue(this.idsCollab);
  }

  getAllCollab() {
    this.compteService
      .getAllComptes()
      .then((res: Collaborateur[]) => {
        for (let compte of res) {
          this.salariesList.push({
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

  getAllSalarieConcerne(idTache: number) {
    this.tacheService
      .getAllSalarieConcerne(idTache)
      .then((res: any[]) => {
        for (let compte of res) {
          let collaborateur = new Collaborateur();
          collaborateur.idCollaborateur = compte.idCollaborateur;
          collaborateur.nom = compte.nom;
          collaborateur.prenom = compte.prenom;
          collaborateur.fonction = compte.fonction;
          collaborateur.dateEmbauche = compte.dateEmbauche;
          collaborateur.email = compte.email;
          collaborateur.dateNaissance = compte.dateNaissance;
          collaborateur.adresse = compte.adresse;
          collaborateur.telephone = compte.telephone;
          collaborateur.username = compte.username;
          collaborateur.password = compte.password;
          collaborateur.role = compte.role;

          this.salariesConcerne.push(collaborateur);
          this.idsCollab.push(compte.idCollaborateur);
        }
      })
      .catch((err) => {});
  }

  getAllCollabCp() {
    this.tacheService
      .getAllCp()
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

  getAllChantiers() {
    this.villeChantierService
      .getAllChantier()
      .then((res) => {
        for (let code of res) {
          this.listChantiers.push({
            idChantier: code.idChantier,
            reference: code.reference,
            clientDto: code.clientDto,
            nomCompletClient: code.nomCompletClient,
            etat: code.etat,
            nomChantier: code.nomChantier,
            localisationDto: code.localisationDto,
            ville: code.ville,
          });
        }
      })
      .catch((err) => {});
  }

  onClose() {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    let tache;

    let libelle: String = this.TacheForm.get('intitule').value;
    let typeTravaux: String = this.TacheForm.get('typeTravaux').value;
    let dateDebut: String = this.TacheForm.get('dateDebut').value;
    let dateFin: String = this.TacheForm.get('dateFin').value;
    let heureDebut: String = this.TacheForm.get('heureDebut').value;
    let heureFin: String = this.TacheForm.get('heureFin').value;
    let commantaire: String = this.TacheForm.get('commentaire').value;
    let idChantier: number = this.TacheForm.get('chantier').value;
    let idSalarie: number = this.TacheForm.get('responsable').value;
    tache = new Tache();

    tache.idTache = this.TacheToAlter.idTache;
    tache.typeTache = this.TacheToAlter.typeTache;
    tache.libelle = libelle;
    tache.dateDebut = dateDebut;
    tache.dateFin = dateFin;
    tache.heureDebut = heureDebut;
    tache.heureFin = heureFin;
    tache.commantaire = commantaire;
    tache.idChantier = new Chantier(idChantier);
    tache.responsable = new Collaborateur(idSalarie);
    tache.nomCompletResponsable = null;
    tache.nomCompletChantier = null;
    tache.typeTravaux = typeTravaux;

    this.router.navigate(['pilpose/tache']);

    let data = new UpdateTacheAffectation();

    data.listIdsCollab = this.selectedSalaries;
    data.tache = tache;
    this.sendDataToUpdate(data);
  }

  sendDataToUpdate(data: UpdateTacheAffectation) {
    this.dialogRef.close(data);
  }
}
