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
import { Client } from 'src/app/model/client.model';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Localisation } from 'src/app/model/localisation.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { CompteService } from '../../comptes/compte.service';
import { ClientService } from '../../mes-clients/client.service';
import { AddChantierService } from '../add-chantier/addChantier.service';
import { ChantierService } from '../chantier.service';

@Component({
  selector: 'app-update-chantier',
  templateUrl: './update-chantier.component.html',
  styleUrls: ['./update-chantier.component.css'],
})
export class UpdateChantierComponent implements OnInit {
  ChantierForm: UntypedFormGroup;
  ChantierToAlter: any;
  localisations: Localisation[] = [];
  localisationDto: Localisation;

  clients: Client[] = [];
  clientDto: Client;

  salarie: Collaborateur;
  salariesRt: Collaborateur[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateChantierComponent>,
    private chantierService: AddChantierService,
    private clientService: ClientService,
    private villeChantierService: ChantierService,
    public toastr: ToastrService,
    private compteService: CompteService,
    public translate: TranslateService,
    public formBuilder: UntypedFormBuilder
  ) {
    this.ChantierToAlter = this.data.chantier;
  }

  ngOnInit(): void {
    this.getAllLocalisation();
    this.getAllClient();

    this.getAllCollabRt();

   
    this.ChantierForm = this.formBuilder.group({
      idChantier: new UntypedFormControl(this.ChantierToAlter.idChantier),
      reference: new UntypedFormControl(
        this.ChantierToAlter.reference,
        Validators.required
      ),
      clientDto: new UntypedFormControl(
        this.ChantierToAlter.clientDto.idCollaborateur,
        Validators.required
      ),
      etat: new UntypedFormControl(
        this.ChantierToAlter.etat,
        Validators.required
      ),

      nomChantier: new UntypedFormControl(
        this.ChantierToAlter.nomChantier,
        Validators.required
      ),
      localisationDto: new UntypedFormControl(
        this.ChantierToAlter.localisationDto.idLocalisation,
        Validators.required
      ),
    });
  }

  getAllClient() {
    this.clientService
      .getAllClient()
      .then((res) => {
        
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

  
  getAllCollabRt() {
    this.compteService
      .getAllRt()
      .then((res: Collaborateur[]) => {
   

        for (let compte of res) {
         

          this.salariesRt.push({
            idCollaborateur: compte.idCollaborateur,
            nom: compte.nom,
            prenom: compte.prenom,
            fonction: compte.fonction,
            dateEmbauche: compte.dateEmbauche,
            email: compte.email,
            dateNaissance: compte.dateNaissance,
            adresse: compte.adresse,
            telephone: compte.telephone,
            username: compte.username,
            password: compte.password,
            role: compte.role,
          });
        }
      })
      .catch((err) => {});
  }

  getAllLocalisation() {
    this.villeChantierService
      .getAllVille()
      .then((res) => {
       
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

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    let chantier;

    let reference: String = this.ChantierForm.get('reference').value;
    let idClientDto = this.ChantierForm.get('clientDto').value;
    let localisationDto: Localisation =
      this.ChantierForm.get('localisationDto').value;
    let etat: String = this.ChantierForm.get('etat').value;
    let nomChantier: String = this.ChantierForm.get('nomChantier').value;
    let idVille = this.ChantierForm.get('localisationDto').value;
    chantier = new Chantier();

    chantier.idChantier = this.ChantierToAlter.idChantier;
    chantier.reference = reference;

    chantier.etat = etat;
    chantier.nomChantier = nomChantier;
    chantier.ville = this.ChantierToAlter.ville;
    chantier.nomCompletClient = this.ChantierToAlter.nomCompletClient;
    let ville: Localisation = {
      idLocalisation: idVille,
    };
    chantier.localisationDto = ville;

    let client: Collaborateur = {
      idCollaborateur: idClientDto,
    };
    chantier.clientDto = client;

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
