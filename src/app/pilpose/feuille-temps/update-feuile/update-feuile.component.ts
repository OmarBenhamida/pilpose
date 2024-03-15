import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/model/chantier.model';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { FeuilleTemps } from 'src/app/model/feuille-temps.model';
import { ChantierService } from '../../chantier/chantier.service';
import { CompteService } from '../../comptes/compte.service';
import { TacheService } from '../../tache/tache.service';

@Component({
  selector: 'app-update-feuile',
  templateUrl: './update-feuile.component.html',
  styleUrls: ['./update-feuile.component.css']
})
export class UpdateFeuileComponent implements OnInit {

  FeuilleForm: UntypedFormGroup;
  FeuilleToAlter: any;
  salaries: Collaborateur[] = [];
  responsable: Collaborateur;
  salariesCp: Collaborateur[] = [];
  listChantiers: Chantier[] = [];
  idChantier: Chantier;
  fonctionUserConnected: String;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateFeuileComponent>,
    private villeChantierService: ChantierService,

    public tacheService: TacheService,
    private compteService: CompteService,
    public toastr: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.FeuilleToAlter = this.data.feuille;
  }

  ngOnInit(): void {


    this.getAllChantiers();
    this.getAllCollabCp();
    this.getAllCollab();
    this.fonctionUserConnected = localStorage.getItem('fonction');
    this.FeuilleForm = this.formBuilder.group({
      idFeuilleTemps: new UntypedFormControl(this.FeuilleToAlter.idFeuilleTemps),
      reference: new UntypedFormControl(this.FeuilleToAlter.reference),
      typeTravaux: new UntypedFormControl(this.FeuilleToAlter.typeTravaux,Validators.required),
      jourSemaine: new UntypedFormControl(this.FeuilleToAlter.jourSemaine,Validators.required),
      heureTravaille: new UntypedFormControl(this.FeuilleToAlter.heureTravaille,Validators.required),
      vehicule: new UntypedFormControl(this.FeuilleToAlter.vehicule, Validators.required),
      vehiculeSuite: new UntypedFormControl(this.FeuilleToAlter.vehiculeSuite, Validators.required ),
      km: new UntypedFormControl(this.FeuilleToAlter.km, Validators.required ),
      commentaire: new UntypedFormControl(this.FeuilleToAlter.commantaire, Validators.required),
      chantier: new UntypedFormControl(this.FeuilleToAlter.idChantier.idChantier,Validators.required),
      responsable: new UntypedFormControl(this.FeuilleToAlter.responsable.idCollaborateur,Validators.required ),
      idCollaborateur: new UntypedFormControl(this.FeuilleToAlter.idCollaborateur.idCollaborateur,Validators.required ),
      statut: new UntypedFormControl(this.FeuilleToAlter.statut,Validators.required ),
      metier: new UntypedFormControl(this.FeuilleToAlter.metier,Validators.required ),
      indemnite: new UntypedFormControl(this.FeuilleToAlter.indemnite,Validators.required ),
      validationChefEquipe: new UntypedFormControl(
        this.FeuilleToAlter.validationChefEquipe,
        Validators.required
      ),

      validationResponsableTravaux: new UntypedFormControl(
        this.FeuilleToAlter.validationResponsableTravaux,
        Validators.required
      ),

      validationGerant: new UntypedFormControl(
        this.FeuilleToAlter.validationGerant,
        Validators.required
      ),

      validationResponsableAdministratif: new UntypedFormControl(
        this.FeuilleToAlter.validationResponsableAdministratif,
        Validators.required
      ),

   
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


  isCE(): boolean {
    return this.fonctionUserConnected === "Chef d'equipe" && this.FeuilleToAlter.idCollaborateur.fonction ==="Salarié(e)"  ;


  }

  isGerant(): boolean {
    return (
      this.fonctionUserConnected === 'Gérant'
    );
  }

  isRT(): boolean {

  
    return (
      this.fonctionUserConnected === 'Responsable de travaux' && this.FeuilleToAlter.idCollaborateur.fonction !=="Responsable administratif"
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
    let statut: String = this.FeuilleForm.get('statut').value;

    let indemnite: boolean = this.FeuilleForm.get('indemnite').value;
    let metier: String = this.FeuilleForm.get('metier').value;

    let validationChefEquipe = this.FeuilleForm.get('validationChefEquipe').value;
    let validationResponsableTravaux = this.FeuilleForm.get(
      'validationResponsableTravaux'
    ).value;
    let validationGerant = this.FeuilleForm.get('validationGerant').value;
    let validationResponsableAdministratif = this.FeuilleForm.get(
      'validationResponsableAdministratif'
    ).value;

    let feuille = new FeuilleTemps();

    feuille.idFeuilleTemps = this.FeuilleToAlter.idFeuilleTemps;
    feuille.reference = this.FeuilleToAlter.reference;
    feuille.statut= statut;
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
    feuille.validationChefEquipe = validationChefEquipe;
    feuille.validationResponsableTravaux = validationResponsableTravaux;
    feuille.validationGerant = validationGerant;
    feuille.validationResponsableAdministratif =
      validationResponsableAdministratif;

    feuille.indemnite= indemnite;
    feuille.metier= metier;


    this.router.navigate(['pilpose/feuilles']);

  
    this.sendDataToUpdate(feuille);
  }

  sendDataToUpdate(data :FeuilleTemps ) {
    this.dialogRef.close(data);
  }
}
0