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
import * as saveAs from 'file-saver';
import { AddTachService } from './add-tache/addTache.service';
import { ToastrService } from 'ngx-toastr';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { FormControl } from '@angular/forms';
import { UpdateTacheAffectation } from 'src/app/model/updateTache.model';
import { AddAffectationService } from './affectation/add-affectation/addAffectation.service';
import { SnackBarNotifService } from 'src/app/service/snack-bar-notif.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css'],
})
export class TacheComponent implements OnInit {
  salariesAll = new FormControl();
  salariesList: Collaborateur[] = [];
  selectedSalaries;

  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private addAffectationService: AddAffectationService,
    private snackBarNotifService: SnackBarNotifService,
    public toastr: ToastrService,
    private dialog: MatDialog,
    private dialogRef: MatDialog,
    private tacheService: TacheService,
    private addTacheService: AddTachService
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

  getAllSalarieConcerne(idTache: number) {
    this.tacheService
      .getAllSalarieConcerne(idTache)
      .then((res: Collaborateur[]) => {
        for (let compte of res) {
          this.salariesList.push({
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

  openDeleteModelPopup(model: any) {
    let body = undefined;

    body = 'Voulez-vous supprimer la tâche ?';
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

          this.tacheService
            .deleteTache(model.idTache)
            .then((res) => {
              this.getModelTableStructur();
            })
            .catch((err) => {});
        }
      });
    }
  }

  exportData() {
    this.tacheService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        console.log('res' + res);

        var blobExcel = Utils.contentToBlob(
          res.pilposeXsl,
          Constants.EXCEL_XLS
        );

        saveAs(blobExcel, 'TACHE_EXCEL' + '.xlsx');
      })
      .catch((err) => {});
  }

  exportDataCsv() {
    this.tacheService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        var blobChantierCsv = Utils.contentToBlob(
          res.pilposeCsv,
          Constants.EXCEL_CSV
        );

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
    dialogRef.afterClosed().subscribe((data: UpdateTacheAffectation) => {
      if (data) {
        this.addTacheService
          .addOrUpdateTache(data.tache)
          .then((res) => {
            this.toastr.success(
              this.translate.instant('Tache modifé avec succés'),
              '',
              Constants.toastOptions
            );

            this.addAffectationService
              .updateAffectationList(data)
              .then((res) => {
                this.toastr.success(
                  this.translate.instant('Affectation mis à jour avec succés'),
                  '',
                  Constants.toastOptions
                );

                this.router.navigate(['pilpose/tache']);
              })
              .catch((err) => {
                if (err.status == 409) {
                  this.snackBarNotifService.openSnackBarFailure(
                    'Chevauchement lors affectation salarié ',
    
                    this.translate.instant('Fermer')
                  );
                } else {
                  this.snackBarNotifService.openSnackBarFailure(
                    'Erreur lors de l affectation',
    
                    this.translate.instant('Fermer')
                  );
                }
              });

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

  redirectAddTache() {
    this.router.navigate(['pilpose/add-tache']);
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.TACHE_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.TACHE_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }

  getModelData() {
    this.tacheService
      .getAllTache()
      .then((res) => {
        let taches: Tache[] = [];

        console.table(res);
        for (let code of res) {
          taches.push({
            idTache: code.idTache,
            libelle: code.libelle,
            dateDebut: code.dateDebut,
            dateFin: code.dateFin,
            heureDebut: code.heureDebut,
            heureFin: code.heureFin,
            commantaire: code.commantaire,
            idChantier: code.idChantier,
            responsable: code.responsable,
            nomCompletChantier: code.nomCompletChantier,
            nomCompletResponsable: code.nomCompletResponsable,
            nomCompletClient: code.nomCompletClient,
            ville: code.ville,
            typeTache : code.typeTache
          });
        }
        this.dataSource.data = taches;
        this.size = this.dataSource.data.length;
      })
      .catch((err) => {});
  }
}
