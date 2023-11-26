import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/model/chantier.model';
import { ChantierService } from 'src/app/pilpose/chantier/chantier.service';
import { Constants } from 'src/app/Shared/utils/constants';


@Component({
  selector: 'app-add-chantier',
  templateUrl: './add-chantier.component.html',
  styleUrls: ['./add-chantier.component.css']
})
export class AddChantierComponent implements OnInit {

  ChantierForm: UntypedFormGroup;
  constructor(private chantierService: ChantierService,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.ChantierForm = this.formBuilder.group({
      id: new UntypedFormControl(''),
      reference: new UntypedFormControl('', Validators.required),
      client: new UntypedFormControl('', Validators.required),
      localisation: new UntypedFormControl('', Validators.required),
    });

  }

  onSubmit() {

    let chantier;
    let reference: String = this.ChantierForm.get("codeChantier").value;
    let client: String = this.ChantierForm.get("nomClient").value;
    let localisation: String = this.ChantierForm.get("localisation").value;
    let etat: String = "En cours";

    chantier = new Chantier(
      0,
      reference,
      client,
      etat,
      localisation
    );

    this.chantierService.addOrUpdateChantier(chantier).then(res => {
      this.toast.error(this.translate.instant('Chantier ajouté avec succés'), '', Constants.toastOptions);

    }).catch(error => {

      this.toast.error(this.translate.instant('Erreur lors de la création d un chantier'), '', Constants.toastOptions);


    });


  }

}
