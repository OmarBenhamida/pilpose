import {
  Component,
  ViewEncapsulation,
  Inject,
  ViewChild,
  inject,
} from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {
  EventRenderedArgs,
  EventSettingsModel,
  View,
  GroupModel,
  TimelineViewsService,
  TimelineMonthService,
  DayService,
  ResizeService,
  DragAndDropService,
  ResourceDetails,
  ScheduleComponent,
  ScheduleAllModule,
  ActionEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { CalendarService } from './calendar.service';
import { map, tap } from 'rxjs';
import { PlanningDto } from 'src/app/model/planning.model';
import { CompteService } from '../comptes/compte.service';
import { TacheService } from '../tache/tache.service';
import { ChantierService } from '../chantier/chantier.service';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { Chantier } from 'src/app/model/chantier.model';

@Component({
  selector: 'app-plannig',
  templateUrl: './plannig.component.html',
  styleUrls: ['./plannig.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DayService,
    TimelineViewsService,
    TimelineMonthService,
    ResizeService,
    DragAndDropService,
  ],
})
export class PlannigComponent {

  salaries: Collaborateur[] = [];
  responsable: Collaborateur;

  salariesAll = new FormControl();
  salariesList: Collaborateur[] = [];
  selectedSalaries : string[] = [];

  TacheForm: UntypedFormGroup;
  listChantiers: Chantier[] = [];


  roleChef : string="Chef d'equipe";

  @ViewChild('scheduleObj')
  public scheduleObj!: ScheduleComponent;

  readonly service = inject(CalendarService);

  public startDate: Date;
  public endDate: Date;
  public showQuickInfo = false;

  public data: Record<string, any>[] = extend(
    [],
    [],
    undefined,
    true
  ) as Record<string, any>[];
  public selectedDate: Date = new Date();
  public currentView: View = 'TimelineDay';
  public employeeDataSource: Record<string, any>[] = [

  ];
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Employee'],
  };
  public allowMultiple = false;
  public eventSettings: EventSettingsModel = { dataSource: this.data };
// Chef d'equipe

  constructor(private router: Router,
    private compteService: CompteService,public tacheService: TacheService,private chantierService: ChantierService) {
    this.service
      .getList()
      .pipe(
        tap((list) => {
          const _list = list.map((e, i) => ({
            Id: i + 1,
            Subject: e.idTache.libelle,
            StartTime: new Date(e.idTache.dateDebut as any),
            EndTime: new Date(e.idTache.dateFin as any),
            IsAllDay: false,
            IsBlock: false,
            EmployeeId: e.idCollaborateur.idCollaborateur,
            // ...e,
          }));

          this.data = extend([], _list, undefined, true) as any;

          this.eventSettings = { dataSource: this.data };

          let grouped = list.reduce((grouped, planningDto) => {
            let key = planningDto.idCollaborateur.idCollaborateur; // Assuming idCollaborateur has an id property
            if (!grouped[key]) {
              grouped[key] = [];
            }
            grouped[key].push(planningDto);
            return grouped;
          }, {});

          this.employeeDataSource = Object.entries(grouped)
            .map(([k, v]) => v as PlanningDto[])
            .filter((list) => list.length)
            .map((list) => list[0])
            .map((e, i) => ({
              Text: e.idCollaborateur.nom + " " + e.idCollaborateur.prenom,
              Id: e.idCollaborateur.idCollaborateur,
              GroupId: i + 1,
              Color: e.idTache.typeTache === "conge" ? 'bleu' :  e.idCollaborateur.fonction === this.roleChef ? 'red' : '#bbdc00',
              Designation: '',
              function: e.idCollaborateur.fonction,
            }));

         

        }),
        tap((e) => {
         
        })
      )
      .subscribe();
  }

  public getEmployeeName(value: ResourceDetails): string {   
    return (value as ResourceDetails).resourceData[
      (value as ResourceDetails).resource.textField!
    ] as string;
  }

  redirectAddTache() {
    this.router.navigate(['pilpose/add-tache']);
  }



  getAllCollab() {
    this.compteService
      .getAllComptes()
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

  getAllCollabCp() {
    this.tacheService
      .getAllCp()
      .then((res: Collaborateur[]) => {
    

        for (let compte of res) {
       
          this.salaries.push({
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

  getAllChantier() {
    this.chantierService
      .getAllChantier()
      .then((res) => {
        for (let ref of res) {
          this.listChantiers.push({
            idChantier: ref.idChantier,
            reference: ref.reference,
            nomChantier: ref.nomChantier,
          });
        }
      })
      .catch((err) => {});
  }

  public getEmployeeFunction(value: ResourceDetails): string  {
    return (value as ResourceDetails).resourceData['function'] as string;

  }
  public getEmployeeDesignation(value: ResourceDetails): string {
    const resourceName: string = (value as ResourceDetails).resourceData[
      (value as ResourceDetails).resource.textField!
    ] as string;
    return (value as ResourceDetails).resourceData['Designation'] as string;
  }

  public getEmployeeImageName(value: ResourceDetails): string {
    return this.getEmployeeName(value).toLowerCase();
  }




  ngOnInit(): void {
    this.getAllChantier();
    this.getAllCollabCp();
    this.getAllCollab();
  }



  public onPopupClose() {
    this.startDate = null;
    this.endDate = null;

  }

  public onEventRendered(args: EventRenderedArgs): void {
    switch (args.data.EventType) {
      case 'Requested':
        (args.element as HTMLElement).style.backgroundColor = '#F57F17';
        break;
      case 'Confirmed':
        (args.element as HTMLElement).style.backgroundColor = '#7fa900';
        break;
      case 'New':
        (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
        break;
    }
  }

  public onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      const data: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
      if (!this.scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date)) {
        args.cancel = true;
      }
    }
  }



}