import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-collab',
  templateUrl: './info-collab.component.html',
  styleUrls: ['./info-collab.component.css']
})
export class InfoCollabComponent implements OnInit {

 
  collabForm: UntypedFormGroup;
  CollabToAlter: any;
  urlAffectation: string = '/collaborateur/v0/';
  constructor(private router: Router,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder,private http: HttpClient) { 

      this.collabForm = this.formBuilder.group({
        nom: new UntypedFormControl(''),
        prenom: new UntypedFormControl('', Validators.required),
        email: new UntypedFormControl('', Validators.required),
        cin: new UntypedFormControl('', Validators.required),
        nationalite : new UntypedFormControl('', Validators.required),
      });


    }

  ngOnInit(): void {
this.getList().subscribe((res : Collaborateur) => {
  console.log(res);
  
  const sampleData = {
    nom: res.nom,
    prenom: res.prenom,
    email:res.email,
    cin: res.cin,
    naissance: res.dateNaissance, // Format: YYYY-MM-DD
    nationalite: res.nationalite };
  this.collabForm.patchValue(sampleData);
})
   /* const sampleData = {
      nom: 'John',
      prenom: 'Doe',
      email: 'johndoe@example.com',
      cin: '1234567890',
      naissance: '1990-01-01', // Format: YYYY-MM-DD
      nationalite: 'Country' 
    };*/

    


  }

  onSubmit() {
/*
    let reference: String = this.ChantierForm.get('reference').value;
    let client: String = this.ChantierForm.get('client').value;
    let localisationDto: String = this.ChantierForm.get('localisationDto').value;
    let etat: String = "En cours";

    let chantier1 = new Chantier();
    chantier1.idChantier = null;
    chantier1.reference = reference;
    chantier1.client = client;
    chantier1.etat = etat;
    chantier1.localisationDto = localisationDto;
    console.log(chantier1);

    this.chantierService.addOrUpdateChantier(chantier1).then(res => {

      
      
      this.toast.success(this.translate.instant('Chantier ajouté avec succés'), '', Constants.toastOptions);
      this.router.navigate(['pilpose/chantier']);

    }).catch(error => {

      this.toast.error(this.translate.instant('Erreur lors de la création d un chantier'), '', Constants.toastOptions);


    });

*/
  }

  getList() {
    const user  : number = Number(localStorage.getItem('idUser'));
     return this.http.get<Collaborateur>(environment.pilposeHost + this.urlAffectation+user);
   }
}
