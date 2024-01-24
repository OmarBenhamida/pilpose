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
import { UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddCongeService } from './add-conge/addConge.service';
import { ToastrService } from 'ngx-toastr';
import { PilposeLoaderResponseDto } from 'src/app/model/PilposeResponse';
import { Utils } from 'src/app/shared/utils/utils';
import * as saveAs from 'file-saver';

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
  nomComplet: String = '';
  selectedFile: File | null = null;
  CongeForm: UntypedFormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    public translate: TranslateService,
    private addCongeService: AddCongeService,
    private dialog: MatDialog,
    private dialogRef: MatDialog,
    public toast: ToastrService,
    private congeService: CongeService
  ) {}

  ngOnInit(): void {
    this.getModelTableStructur();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  actionEvent(event: any) {
    if (event[1] == 'update') {
      this.openAlterModelPopup(event[0]);
    } else if (event[1] == 'Suppression') {
      this.openDeleteModelPopup(event[0]);
    }
  }

  onUpload(): void {
    const formData = new FormData();
    let iduser: number = Number(localStorage.getItem('idUser'));

    formData.append('file', this.selectedFile);
    this.http
      .post('http://localhost:8888/conge/excel/' + iduser, formData)
      .subscribe(
        () => {
          console.log('File uploaded successfully');
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
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
            .deleteConge(model.idConge)
            .then((res) => {
              this.getModelTableStructur();
            })
            .catch((err) => {});
        }
      });
    }
  }

  exportData() {
    this.congeService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        var blobExcel = Utils.contentToBlob(
          res.pilposeXsl,
          Constants.EXCEL_XLS
        );

        saveAs(blobExcel, 'CONGE_EXCEL' + '.xlsx');
      })
      .catch((err) => {});
  }

  exportDataCsv() {
    this.congeService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        var blobChantierCsv = Utils.contentToBlob(
          res.pilposeCsv,
          Constants.EXCEL_CSV
        );

        saveAs(blobChantierCsv, 'CONGE_CSV' + '.csv');
      })
      .catch((err) => {});
  }

  openAlterModelPopup(model: any) {
    const dialogRef = this.dialog.open(UpdateCongeComponent, {
      width: '60vw',
      height: '70vh',
      data: {
        conge: model,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        let conge = new Conge();
        conge.idConge = data.idConge;
        conge.idCollaborateur = data.idCollaborateur;
        conge.dateDebut = data.dateDebut;
        conge.dateDepot = data.dateDepot;
        conge.dateFin = data.dateFin;
        conge.heureDebut = data.heureDebut;
        conge.heureFin = data.heureFin;
        conge.statut = data.statut;
        conge.reference = data.reference;
        conge.typeConge = data.typeConge;

        this.addCongeService
          .addOrUpdateConge(conge)
          .then((res) => {
            this.toast.success(
              this.translate.instant('Congé modifé avec succés'),
              '',
              Constants.toastOptions
            );
            this.getModelTableStructur();
          })
          .catch((err) => {
            this.toast.warning(
              this.translate.instant('Erreur lors de la modification du congé'),
              '',
              Constants.toastOptions
            );
          });

        this.getModelTableStructur();
      }
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
            nomCompletEmploye: code.nomCompletEmploye,
            idCollaborateur: code.idCollaborateur,
          });
        }
        this.dataSource.data = conges;
        this.size = this.dataSource.data.length;
      })
      .catch((err) => {});
  }
}
