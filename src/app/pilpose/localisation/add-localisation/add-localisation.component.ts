import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Localisation } from 'src/app/model/localisation.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { LocalisationService } from '../localisation.service';

@Component({
  selector: 'app-add-localisation',
  templateUrl: './add-localisation.component.html',
  styleUrls: ['./add-localisation.component.css']
})
export class AddLocalisationComponent implements OnInit {
  LocalisationForm: UntypedFormGroup;
  constructor(
    private router: Router,
    private localisationService: LocalisationService,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.LocalisationForm = this.formBuilder.group({
      idLocalisation: new UntypedFormControl(''),
      ville: new UntypedFormControl('', Validators.required),
      codePostale: new UntypedFormControl('', Validators.required),
     
    });
  }

  onSubmit() {
    let ville: String = this.LocalisationForm.get('ville').value;
    let codePostale: String = this.LocalisationForm.get('codePostale').value;


    let commune = new Localisation();
    commune.idLocalisation = null;
    commune.ville = ville;
    commune.codePostale = codePostale;


    this.
    localisationService.addOrUpdateLocalisation(commune)
      .then((res) => {
        this.toast.success(
          this.translate.instant('Commune ajouté avec succés'),
          '',
          Constants.toastOptions
        );
        this.router.navigate(['pilpose/communes']);
      })
      .catch((error) => {
        this.toast.error(
          this.translate.instant('Erreur lors de la création de la commune'),
          '',
          Constants.toastOptions
        );
      });
  }
}
