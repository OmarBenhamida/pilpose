import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/pilpose/confirm-modal/confirm-modal.component';
import { Constants } from 'src/app/Shared/utils/constants';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { CongeService } from './conge.service';
import { UpdateCongeComponent } from './update-conge/update-conge.component';
import { Conge } from 'src/app/model/conge.model';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css'],
})
export class CongeComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;
  nomComplet : String ="";

  constructor(
    private router: Router,
    public translate: TranslateService,
    private dialog: MatDialog,
    private dialogRef: MatDialog,
    private congeService: CongeService
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
          this.congeService
            .deleteConge(model.id)
            .then((res) => {
              this.getModelTableStructur();
            })
            .catch((err) => {});
        }
      });
    }
  }

  openAlterModelPopup(model: any) {
    const dialogRef = this.dialog.open(UpdateCongeComponent, {
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

  redirectAddConge() {
    this.router.navigate(['pilpose/add-conge']);
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.CONGE_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.CONGE_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }

  getModelData() {
    this.congeService
      .getAllConge()
      .then((res) => {
        let conges: any[] = [];

        console.table(res);
        for (let code of res) {
          conges.push({
            idConge: code.idConge,
            reference: code.reference,
            statut: code.statut,
            dateDebut: code.dateDebut,
            dateFin: code.dateFin,
            dateDepot: code.dateDepot,
            heureDebut: code.heureDebut,
            heureFin: code.heureFin,
            typeConge: code.typeConge,
            idCollaborateur: code.idCollaborateur.nom + " " + code.idCollaborateur.prenom
          });
        }
        this.dataSource.data = conges;
        this.size = this.dataSource.data.length;
      })
      .catch((err) => {});
  }
}
