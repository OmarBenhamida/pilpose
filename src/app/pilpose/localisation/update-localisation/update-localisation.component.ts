import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client.model';
import { Localisation } from 'src/app/model/localisation.model';
import { ClientService } from '../../mes-clients/client.service';
import { LocalisationService } from '../localisation.service';

@Component({
  selector: 'app-update-localisation',
  templateUrl: './update-localisation.component.html',
  styleUrls: ['./update-localisation.component.css'],
})
export class UpdateLocalisationComponent implements OnInit {
  LocalisationForm: UntypedFormGroup;
  LocalisationToAlter: any;
  localisations: Localisation[] = [];
  localisation: Localisation;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateLocalisationComponent>,
    public toastr: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.LocalisationToAlter = this.data.localisation;
  }

  ngOnInit(): void {
    this.LocalisationForm = this.formBuilder.group({
      idlocalisation: new UntypedFormControl(this.LocalisationToAlter.idLocalisation),
      ville: new UntypedFormControl(
        this.LocalisationToAlter.ville,
        Validators.required
      ),
      codePostale: new UntypedFormControl(
        this.LocalisationToAlter.codePostale,
        Validators.required
      ),
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    let commune;

    let ville: String = this.LocalisationForm.get('ville').value;
    let codePostale: String = this.LocalisationForm.get('codePostale').value;

    commune = new Localisation();

    commune.idLocalisation = this.LocalisationToAlter.idLocalisation;
    commune.ville = ville;
    commune.codePostale = codePostale;

    this.router.navigate(['pilpose/communes']);

    this.sendDataToUpdate(commune);
  }

  sendDataToUpdate(data: Client) {
    this.dialogRef.close(data);
  }
  close() {
    this.dialogRef.close();
  }
}
