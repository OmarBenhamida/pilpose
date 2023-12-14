import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddTachService } from './addTache.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ChantierService } from '../../chantier/chantier.service';
import { Tache } from 'src/app/model/tache.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { Chantier } from 'src/app/model/chantier.model';


@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent implements OnInit {

  TacheForm: UntypedFormGroup;
  listChantiers : any[]= [];
  constructor(private router: Router,private tacheService: AddTachService,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder,
    private chantierService: ChantierService) { }

  ngOnInit(): void {

    this.getAllChantier();
    
    this.TacheForm = this.formBuilder.group({
      idTache: new UntypedFormControl(''),
      intitule: new UntypedFormControl('', Validators.required),
      dateDebut: new UntypedFormControl('', Validators.required),
      dateFin: new UntypedFormControl('', Validators.required),
      heureDebut: new UntypedFormControl('', Validators.required),
      heureFin: new UntypedFormControl('', Validators.required),
      commentaire: new UntypedFormControl('', Validators.required),
      chantier: new UntypedFormControl('', Validators.required),
    });

  }

  getAllChantier(){
    this.chantierService
    .getAllChantier().then((res) => {
      for (let ref of res) {
        this.listChantiers.push({
          id: ref.idChantier,reference: ref.reference});
      }
    })
    .catch((err) => {});
  }

  onSubmit() {

   
    let libelle: String = this.TacheForm.get('intitule').value;
    let dateDebut: String = this.TacheForm.get('dateDebut').value;
    let dateFin: String = this.TacheForm.get('dateFin').value;
    let heureDebut: number = this.TacheForm.get('heureDebut').value;
    let heureFin: number = this.TacheForm.get('heureFin').value;
    let commantaire: String = this.TacheForm.get('commentaire').value;
    let idChantier: number = this.TacheForm.get('chantier').value;
    
   

    let tache = new Tache();
    tache.idTache = null;
    tache.reference = null;
    tache.libelle = libelle;
    tache.dateDebut = dateDebut;
    tache.dateFin = dateFin;
    tache.heureDebut = heureDebut;
    tache.heureFin = heureFin;
    tache.commantaire = commantaire;
    tache.idChantier =new Chantier(idChantier);
    
   
    console.log(tache);

    this.tacheService.addOrUpdateTache(tache).then(res => {

      
      
      this.toast.success(this.translate.instant('Tache ajoutée avec succés'), '', Constants.toastOptions);
      this.router.navigate(['pilpose/tache']);

    }).catch(error => {

      this.toast.error(this.translate.instant('Erreur lors de la création d une tache'), '', Constants.toastOptions);


    });


  }

  
}
