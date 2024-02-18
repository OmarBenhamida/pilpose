import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/model/chantier.model';
import { Client } from 'src/app/model/client.model';
import { Localisation } from 'src/app/model/localisation.model';
import { AddChantierService } from '../../chantier/add-chantier/addChantier.service';
import { ChantierService } from '../../chantier/chantier.service';
import { UpdateChantierComponent } from '../../chantier/update-chantier/update-chantier.component';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css'],
})
export class UpdateClientComponent implements OnInit {
  ClientForm: UntypedFormGroup;
  ClientToAlter: any;
  clients: Client[] = [];
  client: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateChantierComponent>,
    private clientService: ClientService,
    public toastr: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.ClientToAlter = this.data.chantier;
  }

  ngOnInit(): void {


    this.ClientForm = this.formBuilder.group({
      idClient: new UntypedFormControl(this.ClientToAlter.idClient),
      nom: new UntypedFormControl(this.ClientToAlter.nom, Validators.required),
      prenom: new UntypedFormControl(
        this.ClientToAlter.prenom,
        Validators.required
      ),
      adresse: new UntypedFormControl(
        this.ClientToAlter.adresse,
        Validators.required
      ),

      telephone: new UntypedFormControl(
        this.ClientToAlter.telephone,
        Validators.required
      ),
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    let client;

    let nom: String = this.ClientForm.get('nom').value;
    let prenom: String = this.ClientForm.get('prenom').value;

    let adresse: String = this.ClientForm.get('adresse').value;
    let telephone: String = this.ClientForm.get('telephone').value;

    client = new Client();

    client.idClient = this.ClientToAlter.idClient;
    client.nom = nom;
    client.prenom = prenom;
    client.adresse = adresse;
    client.telephone = telephone;

    this.router.navigate(['pilpose/clients']);
    

    this.sendDataToUpdate(client);
  }

  sendDataToUpdate(data: Client) {
    this.dialogRef.close(data);
  }
  close() {
    this.dialogRef.close();
  }
}
