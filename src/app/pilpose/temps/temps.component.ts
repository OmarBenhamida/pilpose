import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ChantierRecap } from 'src/app/model/ChantierRecap.model';
import { CollaborateurRecap } from 'src/app/model/CollaborateurRecap.model';
import { Constants } from 'src/app/Shared/utils/constants';
import { FeuilleService } from './feuille.service';

@Component({
  selector: 'app-temps',
  templateUrl: './temps.component.html',
  styleUrls: ['./temps.component.css'],
})
export class TempsComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsName: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  size: number = 0;

  displayedColumnsSalarie: string[] = [];
  displayedColumnsNameSalarie: string[] = [];
  dataSourceSalarie: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(
    private router: Router,
    public translate: TranslateService,
    public toastr: ToastrService,
    private dialog: MatDialog,
    private dialogRef: MatDialog,
    private feuileService: FeuilleService
  ) {}

  ngOnInit(): void {
    this.getModelTableStructur();
    this.getModelTableStructurSalarie();
  }

  getModelTableStructur() {
    this.displayedColumns = Constants.CHANTIER_RECAP_DISPLAY_COLUMNS;
    this.displayedColumnsName = Constants.CHANTIER_RECAP_DISPLAY_COLUMNS_NAME;
    this.getModelData();
  }

  getModelTableStructurSalarie() {
    this.displayedColumnsSalarie = Constants.SALARIE_RECAP_DISPLAY_COLUMNS;
    this.displayedColumnsNameSalarie= Constants.SALARIE_RECAP_DISPLAY_COLUMNS_NAME;
    this.getModelDataSalarie();
  }

  getModelData() {
    this.feuileService
      .getAllFeuilleChantier()
      .then((res) => {
        let chanrtiersRecap: ChantierRecap[] = [];

        console.table(res);
        for (let code of res) {
          chanrtiersRecap.push({
            reference: code.idChantier.reference,
            etat: code.idChantier.etat,
            ville: code.idChantier.localisationDto.ville,
            totalHeuresTravaille: code.totalHeuresTravaille,
            nomChantier: code.idChantier.nomChantier,
            idChantier: code.idChantier,
          });
        }
        this.dataSource.data = chanrtiersRecap;
        this.size = this.dataSource.data.length;
      })
      .catch((err) => {});
  }

  getModelDataSalarie() {
    this.feuileService
      .getAllFeuilleSalarie()
      .then((res) => {
        let salariessRecap: CollaborateurRecap[] = [];

        console.table(res);
        for (let code of res) {
          salariessRecap.push({
            totalHeuresTravaille: code.totalHeuresTravaille,
            nomCompletResponsable:
              code.idCollaborateur.nom  +" " +code.idCollaborateur.prenom,
            idCollaborateur: code.idCollaborateur,
          });
        }
        this.dataSourceSalarie.data = salariessRecap;
        this.size = this.dataSourceSalarie.data.length;
      })
      .catch((err) => {});
  }
}
