import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from 'src/app/pilpose/confirm-modal/confirm-modal.component';
import { Constants } from 'src/app/Shared/utils/constants';
import { ChantierService } from './chantier.service';
import { UpdateChantierComponent } from './update-chantier/update-chantier.component';
import { Router } from '@angular/router';
import { Chantier } from 'src/app/model/chantier.model';
import { ToastrService } from 'ngx-toastr';
import { AddChantierService } from './add-chantier/addChantier.service';

@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css'],
})
export class ChantierComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;
  constructor(
    private router: Router,
    public translate: TranslateService,
    public toastr: ToastrService,
    private addChantierService: AddChantierService,

    private dialog: MatDialog,
    private dialogRef: MatDialog,
    private chantierService: ChantierService
  ) {}

  ngOnInit(): void {
    this.getModelTableStructur();
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.CHANTIER_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.CHANTIER_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }

  getModelData() {
    this.chantierService
      .getAllChantier()
      .then((res) => {
        let chantiers: any[] = [];

        console.table(res);
        for (let code of res) {
          chantiers.push({
            id: code.idChantier,
            reference: code.reference,
            client: code.client,
            etat: code.etat,
            localisationDto: code.localisationDto,
          });
        }
        this.dataSource.data = chantiers;
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
          this.chantierService
            .deleteChantier(model.id)
            .then((res) => {
              this.getModelTableStructur();
            })
            .catch((err) => {});
        }
      });
    }
  }

  openAlterModelPopup(model: any) {
   
    
    const dialogRef = this.dialog.open(UpdateChantierComponent, {
      width: '50vw',
      height: '50vh',
      data: {
        chantier: model,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        let chantier = new Chantier();
        chantier.idChantier = data.idChantier;
        chantier.reference = data.reference;
        chantier.client = data.client;
        chantier.etat = data.etat;
        chantier.localisationDto = data.localisationDto;

        this.addChantierService
          .addOrUpdateChantier(chantier)
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
              this.translate.instant('Erreur lors de la modification du chantier'),
              '',
              Constants.toastOptions
            );
          });

        this.getModelTableStructur();
      }
    });
  }

  redirect() {
    this.router.navigate(['pilpose/add-chantier']);
  }
}
