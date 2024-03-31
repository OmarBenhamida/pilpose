import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FeuilleTemps } from 'src/app/model/feuille-temps.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { AddFeuilletempsService } from './add-feuille/add-feuilletemps.service';
import { FeuilleTempsService } from './feuille-temps.service';
import { UpdateFeuileComponent } from './update-feuile/update-feuile.component';
import * as saveAs from 'file-saver';
import { PilposeLoaderResponseDto } from 'src/app/model/PilposeResponse';
import { Utils } from 'src/app/Shared/utils/utils';
import { SnackBarNotifService } from 'src/app/service/snack-bar-notif.service';
@Component({
  selector: 'app-feuille-temps',
  templateUrl: './feuille-temps.component.html',
  styleUrls: ['./feuille-temps.component.css'],
})
export class FeuilleTempsComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;

  constructor(
    private router: Router,
    public translate: TranslateService,

    public toastr: ToastrService,
    private dialog: MatDialog,
    private dialogRef: MatDialog,
    private snackBarNotifService: SnackBarNotifService,
    private addFeuilleService: AddFeuilletempsService,
    private feuilleService: FeuilleTempsService
  ) {}

  ngOnInit(): void {
    this.getModelTableStructur();
  }

  actionEvent(event: any) {
    if (event[1] == 'update') {
      this.openAlterModelPopup(event[0]);
    } else if (event[1] == 'Suppression') {
      this.openDeleteModelPopup(event[0]);
    }
  }

  openDeleteModelPopup(model: any) {
    let body = undefined;

    body = 'Voulez-vous supprimer la feuille de temps ?';
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


          this.feuilleService
            .deleteTache(model.idFeuilleTemps)
            .then((res) => {
              this.getModelTableStructur();
            })
            .catch((err) => {});
        }
      });
    }
  }

  openAlterModelPopup(model: any) {
    const dialogRef = this.dialog.open(UpdateFeuileComponent, {
      width: '105vw',
      height: '95vh',
      data: {
        feuille: model,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: FeuilleTemps) => {
      if (data) {
        this.addFeuilleService
          .addOrUpdateFeuille(data)
          .then((res) => {
            this.toastr.success(
              this.translate.instant('Feuille de temps modifé avec succés'),
              '',
              Constants.toastOptions
            );
            this.getModelTableStructur();
          })
          .catch((err) => {
            if (err.status == 409) {
              this.snackBarNotifService.openSnackBarFailure(
                'Vous ne pouvez pas avoir deux feuilles de temps sur le meme chantier et la meme date.',
  
                this.translate.instant('Fermer')
              );
            } else {
              this.snackBarNotifService.openSnackBarFailure(
                'Erreur lors de la modification de la feuille de temps',
  
                this.translate.instant('Fermer')
              );
            }
          });

        this.getModelTableStructur();
      }
    });
  }

  redirectAddFeuille() {
    this.router.navigate(['pilpose/add-feuille']);
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.FEUILLE_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.FEUILLE_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }

  exportData() {
    this.feuilleService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {


        var blobExcel = Utils.contentToBlob(
          res.pilposeXsl,
          Constants.EXCEL_XLS
        );

        saveAs(blobExcel, 'FEUILLE_TEMPS_EXCEL' + '.xlsx');
      })
      .catch((err) => {});
  }

  exportDataCsv() {
    this.feuilleService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {


        var blobChantierCsv = Utils.contentToBlob(
          res.pilposeCsv,
          Constants.EXCEL_CSV
        );

        saveAs(blobChantierCsv, 'FEUILLE_TEMPS_CSV' + '.csv');
      })
      .catch((err) => {});
  }

  getModelData() {
    this.feuilleService
      .getAllFeuille()
      .then((res) => {
        let feuilles: FeuilleTemps[] = [];


        for (let code of res) {
          feuilles.push({
            idFeuilleTemps: code.idFeuilleTemps,
            reference: code.reference,
            typeTravaux: code.typeTravaux,
            jourSemaine: code.jourSemaine,
            heureTravaille: code.heureTravaille,
            vehicule: code.vehicule,
            vehiculeSuite : code.vehiculeSuite,
            commantaire: code.commantaire,
            km: code.km,
            idChantier: code.idChantier,
            responsable: code.responsable,
            idCollaborateur: code.idCollaborateur,
            nomCompletChantier: code.nomCompletChantier,
            nomCompletResponsable: code.nomCompletResponsable,
            nomCompletClient: code.nomCompletClient,
            nomCompletSalarie: code.nomCompletSalarie,
            statut : code.statut,
            ville: code.ville,
            montantRevise : code.montantRevise,
            indemnite : code.indemnite,
            validationChefEquipe: code.validationChefEquipe,
            validationResponsableTravaux: code.validationResponsableTravaux,
            validationGerant: code.validationGerant,
            validationResponsableAdministratif:
              code.validationResponsableAdministratif,
          });
        }
        this.dataSource.data = feuilles;
        this.size = this.dataSource.data.length;
      })
      .catch((err) => {});
  }
}
