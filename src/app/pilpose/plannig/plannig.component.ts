import {
  Component,
  ViewEncapsulation,
  Inject,
  ViewChild,
  inject,
} from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
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
} from '@syncfusion/ej2-angular-schedule';
import { CalendarService } from './calendar.service';
import { map, tap } from 'rxjs';
import { PlanningDto } from 'src/app/model/planning.model';

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

  roleChef : string="Chef d'equipe";

  @ViewChild('scheduleObj')
  public scheduleObj!: ScheduleComponent;

  readonly service = inject(CalendarService);

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

  constructor() {
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
              Color: e.idCollaborateur.fonction === this.roleChef ? 'red' : '#bbdc00',
              Designation: '',
              function: e.idCollaborateur.fonction,
            }));

          // console.table(_list)
         
           console.table(this.employeeDataSource)

          // return _list as (CalendarEvent & PlanningDto)[];
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
}
