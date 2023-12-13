import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/Shared/utils/constants';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { AddAffectationComponent } from './add-affectation/add-affectation.component';
import { AffectationService } from './affectation.service';
import { UpdateAffectationComponent } from './update-affectation/update-affectation.component';

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
      this.openAlterModelPopup(event[0]);
    } else if (event[1] == 'Suppression') {
      this.openDeleteModelPopup(event[0]);
    }
  }

  openDeleteModelPopup(model: any) {
    let body = undefined;

    body = 'POP_UP.BODY.DELETE_CHANTIER';
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
          /* this.tacheService.deleteTache(model.id).then(res => {
            this.getModelTableStructur();
          }).catch(err => { });*/
        }
      });
    }
  }

  openAlterModelPopup(model: any) {
    const dialogRef = this.dialog.open(UpdateAffectationComponent, {
      width: '50vw',
      height: '50vh',
      data: {
        // codeCategorie: model,
        //categoriesList: this.categoriesList,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      //  if (data) {
      //  let codeCategorie = new Code();
      //codeCategorie.id = data.id;
      //  codeCategorie.code = data.code;
      // codeCategorie.codeClone = data.codeClone;
      // codeCategorie.categorieDto = data.categorieDto;
      // data.active === false ? codeCategorie.active = false : codeCategorie.active = true;
      // data.saturated === false ? codeCategorie.saturated = false : codeCategorie.saturated = true;
      //  this.codeCategorieService.addOrUpdateCodeCategorie(codeCategorie).then(res => {
      //   this.toastr.success(
      //     this.translate.instant('TOAST.OK.CODE_CATEGORIE_UPDATE'),
      //    '',
      //    Constants.toastOptions
      //);
      /*
                this.getModelTableStructur(this.selected);
              }).catch(err => {
                this.toastr.warning(
                  this.translate.instant('TOAST.KO.CODE_CATEGORIE_ACTIVE'),
                  '',
                  Constants.toastOptions
                );
              });
            }
            this.getModelTableStructur(this.selected);
          });
              
      */
      //}
    });
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

        console.table(res);
        for (let code of res) {
          affectatios.push({
            idAffecattion: code.idAffecattion,
            idCollaborateur:
              code.idCollaborateur.nom + ' ' + code.idCollaborateur.prenom,
            idTache: code.idTache.libelle,
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
