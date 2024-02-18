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
  
  
  const sampleData = {
    nom: res.nom,
    prenom: res.prenom,
    email:res.email,
  
    naissance: res.dateNaissance, // Format: YYYY-MM-DD
     };
  this.collabForm.patchValue(sampleData);
})

  }

  onSubmit() {

  }

  getList() {
    const user  : number = Number(localStorage.getItem('idUser'));
     return this.http.get<Collaborateur>(environment.pilposeHost + this.urlAffectation+user);
   }
}
