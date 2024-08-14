import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PilposeLoaderResponseDto } from 'src/app/model/PilposeResponse';
import { Constants } from 'src/app/Shared/utils/constants';
import { Utils } from 'src/app/Shared/utils/utils';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { AddAffectationComponent } from './add-affectation/add-affectation.component';
import { AffectationService } from './affectation.service';
import { UpdateAffectationComponent } from './update-affectation/update-affectation.component';
import * as saveAs from 'file-saver';
import { format } from 'date-fns';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css'],
})
export class AffectationComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private dialog: MatDialog,
    private dialogRef: MatDialog,
    private affectationService: AffectationService
  ) {}

  ngOnInit(): void {
    this.getModelTableStructur();
  }

  actionEvent(event: any) {
    if (event[1] == 'update') {
      this.router.navigate(['pilpose/tache']);
    } else if (event[1] == 'Suppression') {
      this.openDeleteModelPopup(event[0]);
    }
  }

  openDeleteModelPopup(model: any) {
    let body = undefined;

    body = 'Voulez vous supprimer cette affectation ?';
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


           this.affectationService.deleteAffecattion(model.idAffectation).then(res => {
            this.getModelTableStructur();
          }).catch(err => { });
        }
      });
    }
  }



  exportData() {
    this.affectationService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {


        var blobExcel = Utils.contentToBlob(
          res.pilposeXsl,
          Constants.EXCEL_XLS
        );

        var blobChantierCsv = Utils.contentToBlob(
          res.pilposeCsv,
          Constants.EXCEL_CSV
        );



        saveAs(blobExcel, 'AFFECTATION_EXCEL' + '.xlsx');

        saveAs(blobChantierCsv, 'AFFECTATION_CSV' + '.csv');
      })
      .catch((err) => {});
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.AFFECTATION_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.AFFECTATION_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }
  getModelData() {
    this.affectationService
      .getAllAffecattion()
      .then((res) => {
        let affectatios: any[] = [];


        for (let code of res) {
          affectatios.push({
            idAffectation: code.idAffectation,
            idCollaborateur:
              code.idCollaborateur.nom + ' ' + code.idCollaborateur.prenom,
            idTache: code.idTache.libelle,
            dateDebut: code.idTache.dateDebut,
            dateFin: code.idTache.dateFin,
            dateDebutDisplay: format(new Date(code.idTache.dateDebut), 'dd-MM-yyyy'),
            dateFinDisplay: format(new Date(code.idTache.dateFin), 'dd-MM-yyyy'),
            heureDebut: code.idTache.heureDebut,
            heureFin: code.idTache.heureFin,
            nomCompletChantier: code.idTache.nomCompletChantier,
            nomCompletResponsable: code.idTache.nomCompletResponsable,
            commantaire: code.idTache.commantaire,
          });
        }


        this.dataSource.data = affectatios;
        this.size = this.dataSource.data.length;
      })
      .catch((err) => {});
  }

  redirectAffectation() {
    this.router.navigate(['pilpose/affectation']);
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(AddAffectationComponent, {
      width: '750px',
      height: '60vh', // Adjust width as needed
      // Other configuration options like height, data, etc.
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Handle any result or action after the dialog is closed
    });
  }
}
