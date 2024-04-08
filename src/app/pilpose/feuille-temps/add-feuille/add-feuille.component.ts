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
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { FeuilleTemps } from 'src/app/model/feuille-temps.model';
import { ChantierService } from '../../chantier/chantier.service';
import { CompteService } from '../../comptes/compte.service';
import { TacheService } from '../../tache/tache.service';
import { FeuilleTempsService } from '../feuille-temps.service';
import { AddFeuilletempsService } from './add-feuilletemps.service';
import { Constants } from 'src/app/Shared/utils/constants';
import { SnackBarNotifService } from 'src/app/service/snack-bar-notif.service';

@Component({
  selector: 'app-add-feuille',
  templateUrl: './add-feuille.component.html',
  styleUrls: ['./add-feuille.component.css'],
})
export class AddFeuilleComponent implements OnInit {
  salaries: Collaborateur[] = [];
  responsable: Collaborateur;

  salarie: Collaborateur;
  salariesCp: Collaborateur[] = [];

  FeuilleForm: UntypedFormGroup;
  listChantiers: Chantier[] = [];
  constructor(
    private router: Router,
    private addFeuilleService: AddFeuilletempsService,

    public toast: ToastrService,
    public feuilleService: FeuilleTempsService,
    private compteService: CompteService,
    private snackBarNotifService: SnackBarNotifService,
    public translate: TranslateService,
    public tacheService: TacheService,
    public formBuilder: UntypedFormBuilder,
    private chantierService: ChantierService
  ) {}

  ngOnInit(): void {
    this.getAllChantier();
    this.getAllCollabCp();
    this.getAllCollab();

    this.FeuilleForm = this.formBuilder.group({
      idFeuilleTemps: new UntypedFormControl(''),
      typeTravaux: new UntypedFormControl('', Validators.required),
      jourSemaine: new UntypedFormControl('', Validators.required),
      heureTravaille: new UntypedFormControl('', Validators.required),
      vehicule: new UntypedFormControl('', Validators.required),
      vehiculeSuite: new UntypedFormControl(''),
      km: new UntypedFormControl('', Validators.required),
      commentaire: new UntypedFormControl('', Validators.required),
      chantier: new UntypedFormControl('', Validators.required),
      idCollaborateur: new UntypedFormControl('', Validators.required),
      responsable: new UntypedFormControl('', Validators.required),
      indemnite: new UntypedFormControl('', Validators.required),
      montantRevise: new UntypedFormControl('', Validators.required),
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

  getAllCollabCp() {
    this.tacheService
      .getAllCp()
      .then((res: Collaborateur[]) => {
        for (let compte of res) {
          this.salariesCp.push({
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

  getAllChantier() {
    this.chantierService
      .getAllChantier()
      .then((res) => {
        for (let ref of res) {
          this.listChantiers.push({
            idChantier: ref.idChantier,
            reference: ref.reference,
            nomChantier: ref.nomChantier,
          });
        }
      })
      .catch((err) => {});
  }

  validateForm(): boolean {
    return (
      this.FeuilleForm.get('heureTravaille').value >= 0 &&
      this.FeuilleForm.get('jourSemaine').value != null
    );
  }

  onSubmit() {
    let typeTravaux: String = this.FeuilleForm.get('typeTravaux').value;
    let jourSemaine: String = this.FeuilleForm.get('jourSemaine').value;
    let heureTravaille: number = this.FeuilleForm.get('heureTravaille').value;
    let vehicule: String = this.FeuilleForm.get('vehicule').value;
    let km: number = this.FeuilleForm.get('km').value;
    let vehiculeSuite: String = this.FeuilleForm.get('vehiculeSuite').value;
    let commantaire: String = this.FeuilleForm.get('commentaire').value;
    let idChantier: number = this.FeuilleForm.get('chantier').value;
    let idSalarie: number = this.FeuilleForm.get('idCollaborateur').value;
    let idResponsable: number = this.FeuilleForm.get('responsable').value;
    let indemnite: boolean = this.FeuilleForm.get('indemnite').value;
    let montantRevise: number = this.FeuilleForm.get('montantRevise').value;

    let feuille = new FeuilleTemps();
    feuille.idFeuilleTemps = null;
    feuille.typeTravaux = typeTravaux;
    feuille.jourSemaine = jourSemaine;
    feuille.heureTravaille = heureTravaille;
    feuille.vehicule = vehicule;
    feuille.vehiculeSuite = vehiculeSuite;
    feuille.commantaire = commantaire;
    feuille.km = km;
    feuille.idCollaborateur = new Collaborateur(idSalarie);
    feuille.idChantier = new Chantier(idChantier);
    feuille.responsable = new Collaborateur(idResponsable);
    feuille.nomCompletResponsable = null;
    feuille.nomCompletChantier = null;
    feuille.nomCompletSalarie = null;
    feuille.nomCompletSalarie = null;
    feuille.ville = null;
    feuille.reference = null;
    feuille.statut = null;
    feuille.montantRevise = montantRevise;
    feuille.indemnite = indemnite;

    console.log(feuille);

    if (
      feuille.jourSemaine != null &&
      feuille.jourSemaine != '' &&
      feuille.heureTravaille != null &&
      feuille.heureTravaille > 0 &&
      feuille.vehicule != null &&
      feuille.vehicule != ''
    ) {
      this.addFeuilleService
        .addOrUpdateFeuille(feuille)
        .then((res) => {
          this.toast.success(
            this.translate.instant('Feuille de temps ajoutée avec succés'),
            '',
            Constants.toastOptions
          );

          this.router.navigate(['pilpose/feuilles']);
        })

        .catch((err) => {
          if (err.status == 409) {
            this.snackBarNotifService.openSnackBarFailure(
              'Vous ne pouvez pas avoir deux feuilles de temps sur le meme chantier et la meme date.',

              this.translate.instant('Fermer')
            );
          } else {
            this.snackBarNotifService.openSnackBarFailure(
              'Erreur lors de la création de la feuille de temps',

              this.translate.instant('Fermer')
            );
          }
        });

    } else {
      this.toast.error(
        this.translate.instant('Merci de saisir des informations valide'),
        '',
        Constants.toastOptions
      );
    }
  }
}
