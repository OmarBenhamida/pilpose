import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AddCongeService } from './addConge.service';

@Component({
  selector: 'app-add-conge',
  templateUrl: './add-conge.component.html',
  styleUrls: ['./add-conge.component.css']
})
export class AddCongeComponent implements OnInit {

  CongeForm: UntypedFormGroup;
  constructor(private router: Router,private congeService: AddCongeService,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
/*
    this.CongeForm = this.formBuilder.group({
      idChantier: new UntypedFormControl(''),
      reference: new UntypedFormControl('', Validators.required),
      client: new UntypedFormControl('', Validators.required),
      localisationDto: new UntypedFormControl('', Validators.required),
    });
*/
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
