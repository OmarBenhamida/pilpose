import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/model/chantier.model';
import { Client } from 'src/app/model/client.model';
import { Localisation } from 'src/app/model/localisation.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { ClientService } from '../../mes-clients/client.service';
import { ChantierService } from '../chantier.service';
import { AddChantierService } from './addChantier.service';

@Component({
  selector: 'app-add-chantier',
  templateUrl: './add-chantier.component.html',
  styleUrls: ['./add-chantier.component.css'],
})
export class AddChantierComponent implements OnInit {
  localisations: Localisation[] = [];
  localisationDto: Localisation;

  clients: Client[] = [];
  clientDto: Client;

  ChantierForm: UntypedFormGroup;
  constructor(
    private router: Router,
    private chantierService: AddChantierService,
    private villeChantierService: ChantierService,
    private clientService: ClientService,
    public toast: ToastrService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllLocalisation();
    this.getAllClient();

    this.ChantierForm = this.formBuilder.group({
      idChantier: new UntypedFormControl(''),
      reference: new UntypedFormControl('', Validators.required),
      nomChantier: new UntypedFormControl('', Validators.required),
      clientDto: new UntypedFormControl('', Validators.required),
      localisationDto: new UntypedFormControl('', Validators.required),
    });

    console.table(this.localisations);
    console.table(this.clients);
  }

  getAllLocalisation() {
    this.villeChantierService
      .getAllVille()
      .then((res) => {
        console.table(res);
        for (let code of res) {
          this.localisations.push({
            idLocalisation: code.idLocalisation,
            ville: code.ville,
            codePostale: code.codePostale,
          });
        }
      })
      .catch((err) => {});
  }
  getAllClient() {
    this.clientService
      .getAllClient()
      .then((res) => {
        console.table(res);
        for (let code of res) {
          this.clients.push({
            idClient: code.idClient,
            nom: code.nom,
            prenom: code.prenom,
            adresse: code.adresse,
            telephone: code.telephone,
          });
        }
      })
      .catch((err) => {});
  }

  onSubmit() {
    let reference: String = this.ChantierForm.get('reference').value;
    this.localisationDto = this.ChantierForm.get('localisationDto').value;
    let etat: String = 'En cours';
    let nomChantier: String = this.ChantierForm.get('nomChantier').value;

    let idVille = this.ChantierForm.get('localisationDto').value;
    let idClient = this.ChantierForm.get('clientDto').value;

    let chantier1 = new Chantier();
    chantier1.idChantier = null;
    chantier1.reference = reference;

    chantier1.etat = etat;
    chantier1.nomChantier = nomChantier;

    let ville: Localisation = {
      idLocalisation: idVille,
    };

    let clientDto: Client = {
      idClient: idClient,
    };

    chantier1.clientDto = clientDto;

    chantier1.localisationDto = ville;
    console.log(chantier1);

    this.chantierService
      .addOrUpdateChantier(chantier1)
      .then((res) => {
        this.toast.success(
          this.translate.instant('Chantier ajouté avec succés'),
          '',
          Constants.toastOptions
        );
        this.router.navigate(['pilpose/chantier']);
      })
      .catch((error) => {
        this.toast.error(
          this.translate.instant('Erreur lors de la création d un chantier'),
          '',
          Constants.toastOptions
        );
      });
  }
}
