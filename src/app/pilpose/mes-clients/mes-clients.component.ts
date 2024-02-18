import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ClientService } from './client.service';
import { UpdateClientComponent } from './update-client/update-client.component';
import * as saveAs from 'file-saver';
import { PilposeLoaderResponseDto } from 'src/app/model/PilposeResponse';
import { Utils } from 'src/app/shared/utils/utils';
import { SnackBarNotifService } from 'src/app/service/snack-bar-notif.service';

@Component({
  selector: 'app-mes-clients',
  templateUrl: './mes-clients.component.html',
  styleUrls: ['./mes-clients.component.css'],
})
export class MesClientsComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;
  constructor(
    private router: Router,
    public translate: TranslateService,
    public toastr: ToastrService,
    private clientService: ClientService,
    private snackBarNotifService: SnackBarNotifService,
    private dialog: MatDialog,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.getModelTableStructur();
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.CLIENT_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.CLIENT_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }

  getModelData() {
    this.clientService
      .getAllClient()
      .then((res) => {
        let clients: Client[] = [];

       
        for (let code of res) {
          clients.push({
            idClient: code.idClient,
            nom: code.nom,
            prenom: code.prenom,
            adresse: code.adresse,
            telephone: code.telephone,
          });
        }
        
        this.dataSource.data = clients;
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
    this.clientService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        var blobExcel = Utils.contentToBlob(
          res.pilposeXsl,
          Constants.EXCEL_XLS
        );

        saveAs(blobExcel, 'CLIENT_EXCEL' + '.xlsx');
      })
      .catch((err) => {});
  }

  exportDataCsv() {
    this.clientService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        var blobChantierCsv = Utils.contentToBlob(
          res.pilposeCsv,
          Constants.EXCEL_CSV
        );

        saveAs(blobChantierCsv, 'CLIENT_CSV' + '.csv');
      })
      .catch((err) => {});
  }

  openDeleteModelPopup(model: any) {
    let body = undefined;

    body = 'Etes vous sur de bien vouloir supprimer ce client ?';
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
          this.clientService
            .deleteClient(model.idClient)
            .then((res) => {
              this.getModelTableStructur();
            })
            .catch((err) => {
              if (err.status == 409) {
                this.snackBarNotifService.openSnackBarFailure(
                  'Le client à un ou plusieurs chantier en cours',

                  this.translate.instant('Fermer')
                );
              } else {
                this.snackBarNotifService.openSnackBarFailure(
                  'Erreur lors de la suppression du client',

                  this.translate.instant('Fermer')
                );
              }
            });
        }
      });
    }
  }

  openAlterModelPopup(model: any) {
    const dialogRef = this.dialog.open(UpdateClientComponent, {
      width: '50vw',
      height: '50vh',
      data: {
        chantier: model,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: Client) => {
      if (data) {
        this.clientService
          .addOrUpdateClient(data)
          .then((res) => {
            this.toastr.success(
              this.translate.instant('Client modifé avec succés'),
              '',
              Constants.toastOptions
            );
            this.getModelTableStructur();
          })
          .catch((err) => {
            this.toastr.warning(
              this.translate.instant(
                'Erreur lors de la modification du client'
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
    this.router.navigate(['pilpose/add-client']);
  }
}
