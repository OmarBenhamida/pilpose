import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Localisation } from 'src/app/model/localisation.model';
import { PilposeLoaderResponseDto } from 'src/app/model/PilposeResponse';
import { SnackBarNotifService } from 'src/app/service/snack-bar-notif.service';
import { Constants } from 'src/app/Shared/utils/constants';
import { Utils } from 'src/app/shared/utils/utils';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { LocalisationService } from './localisation.service';
import { UpdateLocalisationComponent } from './update-localisation/update-localisation.component';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})
export class LocalisationComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;
  constructor(
    private router: Router,
    public translate: TranslateService,
    public toastr: ToastrService,
    private localisationService: LocalisationService,
    private snackBarNotifService: SnackBarNotifService,
    private dialog: MatDialog,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.getModelTableStructur();
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.LOCALISATION_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.LOCALISATION_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }

  getModelData() {
    this.localisationService
      .getAllLocalisation()
      .then((res) => {
        let communes: Localisation[] = [];

        console.table(res);
        for (let code of res) {
          communes.push({
            idLocalisation: code.idLocalisation,
            ville: code.ville,
            codePostale: code.codePostale,

          });
        }

        this.dataSource.data = communes;
        this.size = this.dataSource.data.length;
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

  exportData() {
    this.localisationService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        var blobExcel = Utils.contentToBlob(
          res.pilposeXsl,
          Constants.EXCEL_XLS
        );

        saveAs(blobExcel, 'COMMUNE_EXCEL' + '.xlsx');
      })
      .catch((err) => {});
  }

  exportDataCsv() {
    this.localisationService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        var blobChantierCsv = Utils.contentToBlob(
          res.pilposeCsv,
          Constants.EXCEL_CSV
        );

        saveAs(blobChantierCsv, 'COMMUNE_CSV' + '.csv');
      })
      .catch((err) => {});
  }

  openDeleteModelPopup(model: any) {
    let body = undefined;

    body = 'Etes vous sur de bien vouloir supprimer cette commune ?';
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
          this.localisationService
            .deleteLocalisation(model.idLocalisation)
            .then((res) => {
              this.getModelTableStructur();
            })
            .catch((err) => {
              if (err.status == 409) {
                this.snackBarNotifService.openSnackBarFailure(
                  'La commune existe sur un ou plusieurs chantiers',

                  this.translate.instant('Fermer')
                );
              } else {
                this.snackBarNotifService.openSnackBarFailure(
                  'Erreur lors de la suppression de la commune',

                  this.translate.instant('Fermer')
                );
              }
            });
        }
      });
    }
  }

  openAlterModelPopup(model: any) {
    const dialogRef = this.dialog.open(UpdateLocalisationComponent, {
      width: '50vw',
      height: '50vh',
      data: {
        localisation: model,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: Localisation) => {
      if (data) {
        this.localisationService
          .addOrUpdateLocalisation(data)
          .then((res) => {
            this.toastr.success(
              this.translate.instant('Commune modifé avec succés'),
              '',
              Constants.toastOptions
            );
            this.getModelTableStructur();
          })
          .catch((err) => {
            this.toastr.warning(
              this.translate.instant(
                'Erreur lors de la modification de la commune'
              ),
              '',
              Constants.toastOptions
            );
          });

        this.getModelTableStructur();
      }
    });
  }

  redirect() {
    this.router.navigate(['pilpose/add-commune']);
  }
}



