import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { AddCompteComponent } from './add-compte/add-compte.component';
import { CompteService } from './compte.service';
import { UpdateCompteComponent } from './update-compte/update-compte.component';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})





export class ComptesComponent implements OnInit {

  

  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;

  constructor(private router: Router,
    public translate: TranslateService,
    private compteService: CompteService,
    private dialog: MatDialog, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.getModelTableStructur();
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.COLLABORATEUR_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.COLLABORATEUR_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }




  getModelData() {
    this.compteService
      .getAllComptes()
      .then((res : Collaborateur[] ) => {
        let comptes: Collaborateur[] = [];
        console.log(res);
        
        
        
        
       
        for (let compte of res) {

          console.log(compte);

           comptes.push({
            idCollaborateur: compte.idCollaborateur,
            nom : compte.nom,
            prenom : compte.prenom,
            fonction : compte.fonction,
            dateEmbauche : compte.dateEmbauche,
            email : compte.email,
            cin : compte.cin,
            nationalite : compte.nationalite,
            dateNaissance : compte.dateNaissance,
            adresse : compte.adresse,
            telephone : compte.telephone,
            username : compte.username,
            password : compte.password

          });
   

        }
        console.table(comptes);
        
        
        this.dataSource.data = comptes;
        this.size = this.dataSource.data.length;
      })
      .catch((err) => {});
  }

  openNew() : void  {

 
      const dialogRef = this.dialog.open(AddCompteComponent, {
        width: '750px',
        height: '100vh' // Adjust width as needed
        // Other configuration options like height, data, etc.
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Handle any result or action after the dialog is closed
      });
    }

  
    openDeleteModelPopup(model: any) {
      let body = undefined;
  
      body = 'POP_UP.BODY.DELETE_COMPTE';
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
            this.compteService
              .deleteCompte(model.idCollaborateur)
              .then((res) => {
                this.getModelTableStructur();
              })
              .catch((err) => {});
          }
        });
      }
    }


  actionEvent(event: any) {
    if (event[1] == 'update') {
      //this.openAlterModelPopup(event[0]);
    } else if (event[1] == 'Suppression') {
      this.openDeleteModelPopup(event[0]);
    }
  }
}


