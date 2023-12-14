import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../tache.service';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { CompteService } from 'src/app/pilpose/comptes/compte.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators  } from '@angular/forms';
import { Affectation } from 'src/app/model/affectation.model';
import { Tache } from 'src/app/model/tache.model';
import { ToastrService } from 'ngx-toastr';
import { AddAffectationService } from './addAffectation.service';
import { Constants } from 'src/app/Shared/utils/constants';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-affectation',
  templateUrl: './add-affectation.component.html',
  styleUrls: ['./add-affectation.component.css']
})
export class AddAffectationComponent implements OnInit {
  affectForm: UntypedFormGroup;
taches: any[] = [];
comptes: any[] = [];
  constructor(private router: Router,public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder,private AffectService: AddAffectationService,private tacheService: TacheService,
    private compteService: CompteService) { }

  ngOnInit(): void {
    this.getAllTache();
    this.getAllCollab();

    this.affectForm = this.formBuilder.group({

      tache: new UntypedFormControl('', Validators.required),
      collab: new UntypedFormControl('', Validators.required),
    });
  }


  getAllTache(){

    
    this.tacheService.getAllTache().then((res) => {
      for (let code of res) {
        this.taches.push({
          idTache: code.idTache,
          reference : code.reference,
          libelle: code.libelle,
          dateDebut: code.dateDebut,
          dateFin: code.dateFin,
          heureDebut : code.heureDebut,
          heureFin: code.heureFin,
          commantaire: code.commantaire,
          idChantier: code.idChantier.client,
        });
      }

    })
      .catch((err) => { });
  }

  getAllCollab(){
    this.compteService
    .getAllComptes()
    .then((res : any[] ) => {
      for (let compte of res) {

        console.log(compte);

        this.comptes.push({
          idCollaborateur: compte.idCollaborateur,
          nom : compte.nom,
          prenom : compte.prenom,
          fonction : compte.fonction,
          dateEmbauche : compte.dateEmbauche,
          email : compte.email,
          cin : compte.cin,
          nationalite : compte.nationalite,
          dateNaissance : compte.dateNaissance,
          adresse : compte.adresse,
          telephone : compte.telephone,
          username : compte.username,
          password : compte.password

        });
 

      }
    })
    .catch((err) => {});
  }




  onSubmit() {

   

    let tache: number = this.affectForm.get('tache').value;
    
    let collab: number = this.affectForm.get('collab').value;

    let affec = new Affectation();

    affec.idCollaborateur= new Collaborateur(collab);
    affec.idTache= new Tache(tache);


    this.AffectService.addOrUpdateAffectation(affec).then(res => {
  
    //  this.router.navigate(['pilpose/affectation']);
      
      
      this.toast.success(this.translate.instant('Affectation ajoutée avec succés'), '', Constants.toastOptions);
      
      window.location.reload();
    }).catch(error => {

      this.toast.error(this.translate.instant('Erreur lors de la création d une affectation'), '', Constants.toastOptions);


    });


  }

}
