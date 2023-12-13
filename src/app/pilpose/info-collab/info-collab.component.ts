import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-collab',
  templateUrl: './info-collab.component.html',
  styleUrls: ['./info-collab.component.css']
})
export class InfoCollabComponent implements OnInit {

 
  ChantierForm: UntypedFormGroup;
  constructor(private router: Router,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.ChantierForm = this.formBuilder.group({
      idChantier: new UntypedFormControl(''),
      reference: new UntypedFormControl('', Validators.required),
      client: new UntypedFormControl('', Validators.required),
      localisationDto: new UntypedFormControl('', Validators.required),
    });

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

}
