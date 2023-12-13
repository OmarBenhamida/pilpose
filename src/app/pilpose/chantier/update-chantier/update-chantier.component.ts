import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/model/chantier.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { AddChantierService } from '../add-chantier/addChantier.service';

@Component({
  selector: 'app-update-chantier',
  templateUrl: './update-chantier.component.html',
  styleUrls: ['./update-chantier.component.css'],
})
export class UpdateChantierComponent implements OnInit {
  ChantierForm: UntypedFormGroup;
  ChantierToAlter: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateChantierComponent>,
    private chantierService: AddChantierService,
    public toastr: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.ChantierToAlter = this.data.chantier;
  }

  ngOnInit(): void {
    console.log("++++++s++++++",this.ChantierToAlter);
    this.ChantierForm = this.formBuilder.group({
      idChantier: new UntypedFormControl(this.ChantierToAlter.idChantier),
      reference: new UntypedFormControl(
        this.ChantierToAlter.reference,
        Validators.required
      ),
      client: new UntypedFormControl(
        this.ChantierToAlter.client,
        Validators.required
      ),
      etat: new UntypedFormControl(
        this.ChantierToAlter.etat,
        Validators.required
      ),
      localisationDto: new UntypedFormControl(
        this.ChantierToAlter.localisationDto,
        Validators.required
      ),
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    let chantier;

    let reference: String = this.ChantierForm.get('reference').value;
    let client: String = this.ChantierForm.get('client').value;
    let localisationDto: String =
      this.ChantierForm.get('localisationDto').value;
    let etat: String = this.ChantierForm.get('etat').value;

    chantier = new Chantier(
      this.ChantierToAlter.id,
      reference,
      client,
      etat,
      localisationDto
     
    );
    this.router.navigate(['pilpose/chantier']);
    this.sendDataToUpdate(chantier);

  }

  sendDataToUpdate(data: Chantier) {
    this.dialogRef.close(data);
  }
  close() {
    this.dialogRef.close();
  }
}
