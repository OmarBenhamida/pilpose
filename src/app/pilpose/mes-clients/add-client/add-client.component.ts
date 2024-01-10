import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  ClientForm: UntypedFormGroup;
  constructor(
    private router: Router,
    private clientService: ClientService,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.ClientForm = this.formBuilder.group({
      idClient: new UntypedFormControl(''),
      nom: new UntypedFormControl('', Validators.required),
      prenom: new UntypedFormControl('', Validators.required),
      adresse: new UntypedFormControl('', Validators.required),
      telephone: new UntypedFormControl('', Validators.required),
    });
  }

  onSubmit() {
    let nom: String = this.ClientForm.get('nom').value;
    let prenom: String = this.ClientForm.get('prenom').value;
    let adresse: String = this.ClientForm.get('adresse').value;
    let telephone: String = this.ClientForm.get('telephone').value;

    let client = new Client();
    client.idClient = null;
    client.nom = nom;
    client.prenom = prenom;
    client.adresse = adresse;
    client.telephone = telephone;

    this.clientService
      .addOrUpdateClient(client)
      .then((res) => {
        this.toast.success(
          this.translate.instant('client ajouté avec succés'),
          '',
          Constants.toastOptions
        );
        this.router.navigate(['pilpose/clients']);
      })
      .catch((error) => {
        this.toast.error(
          this.translate.instant('Erreur lors de la création d un client'),
          '',
          Constants.toastOptions
        );
      });
  }
}
