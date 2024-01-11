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
import { ChantierService } from '../../chantier/chantier.service';
import { CompteService } from '../../comptes/compte.service';
import { AddTachService } from '../add-tache/addTache.service';
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

  listChantiers: Chantier[] = [];
  idChantier: Chantier;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateTacheComponent>,
    private villeChantierService: ChantierService,
    public tacheService: TacheService,
    public toastr: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.TacheToAlter = this.data.tache;
  }

  ngOnInit(): void {
    this.getAllChantiers();
    this.getAllCollabCp();
    console.log('++++++s++++++', this.TacheToAlter);
    this.TacheForm = this.formBuilder.group({
      idTache: new UntypedFormControl(this.TacheToAlter.idTache),
      intitule: new UntypedFormControl(
        this.TacheToAlter.libelle,
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
    });
  }

  getAllCollabCp() {
    this.tacheService
      .getAllCp()
      .then((res: Collaborateur[]) => {
        console.log(res);

        for (let compte of res) {
          console.log(compte);

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
    

        console.table(res);
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
    let dateDebut: String = this.TacheForm.get('dateDebut').value;
    let dateFin: String = this.TacheForm.get('dateFin').value;
    let heureDebut: String = this.TacheForm.get('heureDebut').value;
    let heureFin: String = this.TacheForm.get('heureFin').value;
    let commantaire: String = this.TacheForm.get('commentaire').value;
    let idChantier: number = this.TacheForm.get('chantier').value;
    let idSalarie: number = this.TacheForm.get('responsable').value;
    tache = new Tache();

    tache.idTache = this.TacheToAlter.idTache;
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

    this.router.navigate(['pilpose/tache']);
    console.log('log to alter ', tache);

    this.sendDataToUpdate(tache);
  }

  sendDataToUpdate(data: Tache) {
    this.dialogRef.close(data);
  }
}
