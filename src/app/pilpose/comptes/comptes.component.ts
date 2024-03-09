import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { PilposeLoaderResponseDto } from 'src/app/model/PilposeResponse';
import { Constants } from 'src/app/Shared/utils/constants';
import { Utils } from 'src/app/Shared/utils/utils';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { AddCompteComponent } from './add-compte/add-compte.component';
import { AddCompteService } from './add-compte/addCompte.service';
import { CompteService } from './compte.service';
import { UpdateCompteComponent } from './update-compte/update-compte.component';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css'],
})
export class ComptesComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;

  constructor(
    private router: Router,
    public translate: TranslateService,
    public toastr: ToastrService,
    private compteService: CompteService,
    private addCompteService: AddCompteService,
    private dialog: MatDialog,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.getModelTableStructur();
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.COLLABORATEUR_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.COLLABORATEUR_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }

  getModelData() {
    this.compteService
      .getAllComptes()
      .then((res: Collaborateur[]) => {
        let comptes: Collaborateur[] = [];


        for (let compte of res) {


          comptes.push({
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


        this.dataSource.data = comptes;
        this.size = this.dataSource.data.length;
      })
      .catch((err) => {});
  }

  openNew(): void {
    const dialogRef = this.dialog.open(AddCompteComponent, {
      width: '750px',
      height: '80vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openDeleteModelPopup(model: any) {
    let body = undefined;

    body = 'POP_UP.BODY.DELETE_COMPTE';
    if (body) {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        panelClass: '',
        data: {
          title: this.translate.instant('POP_UP.BTN.DELETE'),
          action: this.translate.instant('POP_UP.ACTION.DELETE'),
          userMessage: this.translate.instant(body),
        },
      });
      dialogRef.afterClosed().subscribe((data: true) => {
        if (data) {
          this.compteService
            .deleteCompte(model.idCollaborateur)
            .then((res) => {
              this.getModelTableStructur();
            })
            .catch((err) => {});
        }
      });
    }
  }

  openAlterModelPopup(model: any) {
    const dialogRef = this.dialog.open(UpdateCompteComponent, {
      width: '60vw',
      height: '90vh',
      data: {
        compte: model,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        let compte = new Collaborateur();
        compte.idCollaborateur = data.idCollaborateur;
        compte.nom = data.nom;
        compte.prenom = data.prenom;
        compte.adresse = data.adresse;
        compte.email = data.email;
        compte.username = data.username;
        compte.password = data.password;
        compte.telephone = data.telephone;
        compte.dateEmbauche = data.dateEmbauche;
        compte.dateNaissance = data.dateNaissance;
        compte.fonction = data.fonction;
        compte.role = data.role;

        this.addCompteService
          .addOrUpdateCollab(compte)
          .then((res) => {
            this.toastr.success(
              this.translate.instant('Chantier modifé avec succés'),
              '',
              Constants.toastOptions
            );
            this.getModelTableStructur();
          })
          .catch((err) => {
            this.toastr.warning(
              this.translate.instant(
                'Erreur lors de la modification du chantier'
              ),
              '',
              Constants.toastOptions
            );
          });

        this.getModelTableStructur();
      }
    });
  }

  exportData() {
    this.compteService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {


        var blobExcel = Utils.contentToBlob(
          res.pilposeXsl,
          Constants.EXCEL_XLS
        );

        saveAs(blobExcel, 'SALARIES_EXCEL' + '.xlsx');
      })
      .catch((err) => {});
  }

  exportDataCsv() {
    this.compteService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        var blobChantierCsv = Utils.contentToBlob(
          res.pilposeCsv,
          Constants.EXCEL_CSV
        );

        saveAs(blobChantierCsv, 'SALARIES_CSV' + '.csv');
      })
      .catch((err) => {});
  }

  actionEvent(event: any) {
    if (event[1] == 'update') {
      this.openAlterModelPopup(event[0]);
    } else if (event[1] == 'Suppression') {
      this.openDeleteModelPopup(event[0]);
    }
  }
}
