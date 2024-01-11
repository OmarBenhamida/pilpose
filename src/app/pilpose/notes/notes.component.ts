import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from 'src/app/pilpose/confirm-modal/confirm-modal.component';
import { Constants } from 'src/app/Shared/utils/constants';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from './note.service';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { PilposeLoaderResponseDto } from 'src/app/model/PilposeResponse';
import { Utils } from 'src/app/shared/utils/utils';
import * as saveAs from 'file-saver';
import { AddNoteService } from './add-note/addNote.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private addNoteService: AddNoteService,
    private dialog: MatDialog,
    public toastr: ToastrService,
    private dialogRef: MatDialog,
    private noteService: NoteService
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
          this.noteService
            .deleteNote(model.id)
            .then((res) => {
              this.getModelTableStructur();
            })
            .catch((err) => {});
        }
      });
    }
  }

  exportData() {
    this.noteService
      .exportFile()
      .then((res: PilposeLoaderResponseDto) => {
        console.log('res' + res);

        var blobExcel = Utils.contentToBlob(
          res.pilposeXsl,
          Constants.EXCEL_XLS
        );

        var blobChantierCsv = Utils.contentToBlob(
          res.pilposeCsv,
          Constants.EXCEL_CSV
        );

        console.log('excel : ' + res.pilposeXsl);
        console.log('csv : ' + res.pilposeCsv);

        saveAs(blobExcel, 'NOTE_FRAIS_EXCEL' + '.xlsx');

        saveAs(blobChantierCsv, 'NOTE_FRAIS_CSV' + '.csv');
      })
      .catch((err) => {});
  }

  openAlterModelPopup(model: any) {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '60vw',
      height: '60vh',
      data: {
        note: model,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.addNoteService
          .addOrUpdateNote(data)
          .then((res) => {
            this.toastr.success(
              this.translate.instant('Note modifé avec succés'),
              '',
              Constants.toastOptions
            );
            this.getModelTableStructur();
          })
          .catch((err) => {
            this.toastr.warning(
              this.translate.instant(
                'Erreur lors de la modification de la note'
              ),
              '',
              Constants.toastOptions
            );
          });

        this.getModelTableStructur();
      }
    });
  }

  redirectAddNote() {
    this.router.navigate(['pilpose/add-note']);
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.NOTE_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.NOTE_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }

  getModelData() {
    this.noteService
      .getAllNote()
      .then((res) => {
        let notes: any[] = [];

        console.table(res);
        for (let code of res) {
          notes.push({
            idNoteFrais: code.idNoteFrais,
            reference: code.reference,
            typeNote: code.typeNote,
            dateNote: code.dateNote,
            idCollaborateur: code.idCollaborateur,
            nomCompletEmploye: code.nomCompletEmploye,
          });
        }
        this.dataSource.data = notes;
        this.size = this.dataSource.data.length;
      })
      .catch((err) => {});
  }
}
