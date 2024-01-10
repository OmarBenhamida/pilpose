import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AddTachService } from './addTache.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ChantierService } from '../../chantier/chantier.service';
import { Tache } from 'src/app/model/tache.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { Chantier } from 'src/app/model/chantier.model';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { TacheService } from '../tache.service';

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css'],
})
export class AddTacheComponent implements OnInit {
  salaries: Collaborateur[] = [];
  responsable: Collaborateur;

  TacheForm: UntypedFormGroup;
  listChantiers: Chantier[] = [];
  constructor(
    private router: Router,
    private addTacheService: AddTachService,
    public toast: ToastrService,
    public tacheService: TacheService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder,
    private chantierService: ChantierService
  ) {}

  ngOnInit(): void {
    this.getAllChantier();
    this.getAllCollabCp();

    this.TacheForm = this.formBuilder.group({
      idTache: new UntypedFormControl(''),
      intitule: new UntypedFormControl('', Validators.required),
      dateDebut: new UntypedFormControl('', Validators.required),
      dateFin: new UntypedFormControl('', Validators.required),
      heureDebut: new UntypedFormControl('', Validators.required),
      heureFin: new UntypedFormControl('', Validators.required),
      commentaire: new UntypedFormControl('', Validators.required),
      chantier: new UntypedFormControl('', Validators.required),
      idCollaborateur: new UntypedFormControl('', Validators.required),
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

  onSubmit() {
    let libelle: String = this.TacheForm.get('intitule').value;
    let dateDebut: String = this.TacheForm.get('dateDebut').value;
    let dateFin: String = this.TacheForm.get('dateFin').value;
    let heureDebut: String = this.TacheForm.get('heureDebut').value;
    let heureFin: String = this.TacheForm.get('heureFin').value;
    let commantaire: String = this.TacheForm.get('commentaire').value;
    let idChantier: number = this.TacheForm.get('chantier').value;
    let idSalarie : number = this.TacheForm.get('idCollaborateur').value;

    let tache = new Tache();
    tache.idTache = null;
 
    tache.libelle = libelle;
    tache.dateDebut = dateDebut;
    tache.dateFin = dateFin;
    tache.heureDebut = heureDebut;
    tache.heureFin = heureFin;
    tache.commantaire = commantaire;
    tache.idChantier = new Chantier(idChantier);
    tache.responsable = new Collaborateur(idSalarie);
    tache.nomCompletResponsable = null;
    tache.nomCompletChantier=null
    this.addTacheService
      .addOrUpdateTache(tache)
      .then((res) => {
        this.toast.success(
          this.translate.instant('Tache ajoutée avec succés'),
          '',
          Constants.toastOptions
        );
        this.router.navigate(['pilpose/tache']);
      })
      .catch((error) => {
        this.toast.error(
          this.translate.instant('Erreur lors de la création d une tache'),
          '',
          Constants.toastOptions
        );
      });
  }
}
