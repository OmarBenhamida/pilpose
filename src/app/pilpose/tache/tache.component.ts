import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from 'src/app/pilpose/confirm-modal/confirm-modal.component';
import { TacheService } from './tache.service';
import { Constants } from 'src/app/Shared/utils/constants';
import { UpdateTacheComponent } from './update-tache/update-tache.component';
import { Tache } from 'src/app/model/tache.model';
import { PilposeLoaderResponseDto } from 'src/app/model/PilposeResponse';
import { Utils } from 'src/app/shared/utils/utils';
import * as saveAs from 'file-saver'
import { AddTachService } from './add-tache/addTache.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {


  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;


  constructor(private router: Router,
    public translate: TranslateService,
    public toastr: ToastrService,
     private dialog: MatDialog, private dialogRef: MatDialog,
     private tacheService: TacheService, private addTacheService : AddTachService) { }

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

    body = 'Voulez-vous supprimer la tache ?';
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

          console.log(data);
          
          this.tacheService.deleteTache(model.idTache).then(res => {
            this.getModelTableStructur();
          }).catch(err => { });
        }
      });
    }

  }

  exportData() {
    this.tacheService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {

        console.log("res" +res);
        
        var blobExcel = Utils.contentToBlob(
          res.pilposeXsl,
          Constants.EXCEL_XLS
        );

        var blobChantierCsv = Utils.contentToBlob(
          res.pilposeCsv,
          Constants.EXCEL_CSV
        );

        console.log("excel : " +  res.pilposeXsl);
        console.log("csv : " +  res.pilposeCsv);

        saveAs(blobExcel, 'TACHE_EXCEL' + '.xlsx');

        saveAs(blobChantierCsv, 'TACHE_CSV' + '.csv');
      })
      .catch((err) => {});
  }


 

  openAlterModelPopup(model: any) {
    const dialogRef = this.dialog.open(UpdateTacheComponent, {
      width: '60vw',
      height: '80vh',
      data: {
        tache: model,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: Tache) => {
      if (data) {
        this.addTacheService
          .addOrUpdateTache(data)
          .then((res) => {
            this.toastr.success(
              this.translate.instant('Tache modifé avec succés'),
              '',
              Constants.toastOptions
            );
            this.getModelTableStructur();
          })
          .catch((err) => {
            this.toastr.warning(
              this.translate.instant(
                'Erreur lors de la modification de la tache'
              ),
              '',
              Constants.toastOptions
            );
          });

        this.getModelTableStructur();
      }
    });
  }

  redirectAddTache(){
    this.router.navigate(['pilpose/add-tache']);
  }

  
  getModelTableStructur() {

    this.displayedColumns = Constants.TACHE_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.TACHE_DISPLAY_COLUMNS_NAME;
    this.getModelData();

  }

  getModelData() {

    this.tacheService.getAllTache().then((res) => {
      let taches: Tache[] = [];

      console.table(res);
      for (let code of res) {
        taches.push({
          idTache: code.idTache,
          libelle: code.libelle,
          dateDebut: code.dateDebut,
          dateFin: code.dateFin,
          heureDebut : code.heureDebut,
          heureFin: code.heureFin,
          commantaire: code.commantaire,
          idChantier: code.idChantier,
          responsable: code.responsable,
          nomCompletChantier : code.nomCompletChantier,
          nomCompletResponsable : code.nomCompletResponsable
        });
      }
      this.dataSource.data = taches;
      this.size = this.dataSource.data.length;
    })
      .catch((err) => { });


  }

}
