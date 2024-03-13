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
  ActionEventArgs,
  PopupOpenEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { CalendarService } from './calendar.service';
import { map, tap } from 'rxjs';
import { PlanningDto } from 'src/app/model/planning.model';
import { CompteService } from '../comptes/compte.service';
import { TacheService } from '../tache/tache.service';
import { ChantierService } from '../chantier/chantier.service';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { Chantier } from 'src/app/model/chantier.model';
import { createElement } from '@syncfusion/ej2-base';
import {
  FormControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { SnackBarNotifService } from 'src/app/service/snack-bar-notif.service';
import { AddAffectationService } from '../tache/affectation/add-affectation/addAffectation.service';
import { Constants } from 'src/app/Shared/utils/constants';
import { AddTachService } from '../tache/add-tache/addTache.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Tache } from 'src/app/model/tache.model';
import { AddTacheComponent } from '../tache/add-tache/add-tache.component';
import { MatDialog } from '@angular/material/dialog';

import { setCulture } from '@syncfusion/ej2-base';

import { loadCldr, L10n } from '@syncfusion/ej2-base';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as gregorian from 'cldr-data/main/fr/ca-gregorian.json';
import * as numbers from 'cldr-data/main/fr/numbers.json';
import * as timeZoneNames from 'cldr-data/main/fr/timeZoneNames.json';

import { ElementRef } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import {
  WeekService,
  WorkWeekService,
  MonthService,
} from '@syncfusion/ej2-angular-schedule';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/service/host.service';
import { urlsConstantsAffectation } from '../tache/affectation/urlsConstants';
import { urlsConstantsTache } from '../chantier/urlsConstants';

loadCldr(
  numberingSystems['default'],
  gregorian['default'],
  numbers['default'],
  timeZoneNames['default']
);
L10n.load({
  fr: {
    schedule: {
      day: 'journée',
      title: 'libelle',
      addTitle: 'Ajouter une tache',
      moreDetails: 'Plus d`info',
      week: 'la semaine',
      workWeek: 'Semaine de travail',
      month: 'Mois',
      today: "Aujourd'hui",
      noEvents: "Pas d'événements",
      timelineDay: 'Vue journalière',
      timelineMonth: 'Vue mensuelle',
      newEvent: 'Nouvelle Affectation',
      location: 'Localisation',
      start: 'Date début',
      end: 'Date fin',
      'saveEvent  ': 'Soumettre',
      cancel: 'annuler',
      saveButton: 'Soumettre',
      cancelButton: 'Fermer',
      owner: 'salariés',
      repeat: 'reproduire',
      description: 'commentaire',
      delete: 'supprimer',
      deleteButton: 'supprimer',

      deleteEvent: 'Supprimer la tache',
      deleteContent: 'Êtes-vous sûr de vouloir supprimer cet événement ?',

      // Add other translations as needed
    },
  },
});

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
  selectedSalaries: any[] = [];

  TacheForm: UntypedFormGroup;
  listChantiers: Chantier[] = [];

  public allowMultipleOwner: Boolean = true;

  roleChef: string = "Chef d'equipe";

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
  public employeeDataSource: Record<string, any>[] = [];
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Employee'],
  };
  public allowMultiple = false;
  public eventSettings: EventSettingsModel = { dataSource: this.data };

  public host: string;
  // Chef d'equipe

  constructor(
    private http: HttpClient,
    private hostService: HostService,
    private router: Router,
    public formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    private addTacheService: AddTachService,
    private addAffectationService: AddAffectationService,
    private snackBarNotifService: SnackBarNotifService,
    public translate: TranslateService,
    public toast: ToastrService,
    private compteService: CompteService,
    public tacheService: TacheService,
    private chantierService: ChantierService
  ) {
    this.host = this.hostService.getPilposeHost();
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
            TacheId: e.idTache.idTache,
            Location: e.idTache.ville,
            Description: e.idTache.commantaire,
            chantier: e.idTache.idChantier.idChantier,
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
              Text: e.idCollaborateur.nom + ' ' + e.idCollaborateur.prenom,
              Id: e.idCollaborateur.idCollaborateur,
              GroupId: i + 1,
              Color:
                e.idTache.typeTache === 'conge'
                  ? 'bleu'
                  : e.idCollaborateur.fonction === this.roleChef
                  ? 'red'
                  : '#bbdc00',
              Designation: '',
              function: e.idCollaborateur.fonction,
            }));
        }),
        tap((e) => {})
      )
      .subscribe();

console.log("hhh");

      console.log(this.employeeDataSource);
      
      
  }

  public getEmployeeName(value: ResourceDetails): string {
    return (value as ResourceDetails).resourceData[
      (value as ResourceDetails).resource.textField!
    ] as string;
  }

  ngOnInit(): void {
    this.getAllChantier();
    this.getAllCollabCp();
    this.getAllCollab();
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

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      if (!args.element.querySelector('.custom-field-row')) {
        // Create required custom elements in initial time
        const row: HTMLElement = createElement('div', {
          className: 'custom-field-row',
        });
        const formElement: HTMLElement = args.element.querySelector(
          '.e-schedule-form'
        ) as HTMLElement;
        formElement.firstChild.insertBefore(
          row,
          args.element.querySelector('.e-title-location-row')
        );
        const container: HTMLElement = createElement('div', {
          className: 'custom-field-container',
        });
        const inputEle: HTMLElement = createElement('input', {
          className: 'e-field',
          attrs: { name: 'typetache' },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        const dropDownList: DropDownList = new DropDownList({
          dataSource: [
            { text: 'Chauffage', value: 'Chauffage' },
            {
              text: 'SAV – Entretien – Dépannage 7j/7',
              value: 'SAV – Entretien – Dépannage 7j/7',
            },
            { text: 'Climatisation', value: 'Climatisation' },
            { text: 'Électricité', value: 'Électricité' },
            { text: 'Sanitaire – Plomberie', value: 'Sanitaire – Plomberie' },
            {
              text: 'Conception et Réalisation',
              value: 'Conception et Réalisation',
            },
          ],
          fields: { text: 'text', value: 'value' },
          value: (args.data as Record<string, any>).EventType as string,
          floatLabelType: 'Always',
          placeholder: 'Type Tache',
        });
        dropDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'typetache');
        /**
         *
         */
        const row2: HTMLElement = createElement('div', {
          className: 'custom-field-row',
        });
        const formElement2: HTMLElement = args.element.querySelector(
          '.e-schedule-form'
        ) as HTMLElement;
        formElement2.firstChild.insertBefore(
          row2,
          args.element.querySelector('.e-start-end-row')
        );
        const container2: HTMLElement = createElement('div', {
          className: 'custom-field-container',
        });
        const inputEle2: HTMLElement = createElement('input', {
          className: 'e-field',
          attrs: { name: 'chefequipe' },
        });
        container2.appendChild(inputEle2);
        row2.appendChild(container2);
        const dataSource2: { text: string; value: string }[] = [];

        this.salaries.forEach((salarie) => {
          dataSource2.push({
            text: salarie.nom.toString(),
            value: salarie.idCollaborateur.toString(),
          });
        });
        const dropDownList2: DropDownList = new DropDownList({
          dataSource: dataSource2,
          fields: { text: 'text', value: 'value' },
          value: (args.data as Record<string, any>).EventType as string,
          floatLabelType: 'Always',
          placeholder: 'chef d`équipe',
        });
        dropDownList2.appendTo(inputEle2);
        inputEle2.setAttribute('name', 'chefequipe');
        /**
         *
         */

        const row3: HTMLElement = createElement('div', {
          className: 'custom-field-row',
        });
        const formElement3: HTMLElement = args.element.querySelector(
          '.e-schedule-form'
        ) as HTMLElement;
        formElement3.firstChild.insertBefore(
          row3,
          args.element.querySelector('.e-description-row')
        );
        const container3: HTMLElement = createElement('div', {
          className: 'custom-field-container',
        });
        const inputEle3: HTMLElement = createElement('input', {
          className: 'e-field',
          attrs: { name: 'chantier' },
        });
        container3.appendChild(inputEle3);
        row3.appendChild(container3);
        const dataSource3: { text: string; value: string }[] = [];

        this.listChantiers.forEach((salarie) => {
          dataSource3.push({
            text: salarie.nomChantier.toString(),
            value: salarie.idChantier.toString(),
          });
        });
        const dropDownList3: DropDownList = new DropDownList({
          dataSource: dataSource3,
          fields: { text: 'text', value: 'value' },
          value: (args.data as Record<string, any>).EventType as string,
          floatLabelType: 'Always',
          placeholder: 'liste des chantiers',
        });
        dropDownList3.appendTo(inputEle3);
        inputEle3.setAttribute('name', 'chantier');
      }
    }
    /*if (args.type === 'Editor' || args.type === 'QuickInfo')  {
        args.cancel = true;
    }*/
  }

  openpopUp = () => {
    const dialogRef = this.dialog.open(AddTacheComponent, {
      width: '60vw',
      height: '80vh',
    });
  };

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

  public getEmployeeFunction(value: ResourceDetails): string {
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
    if (
      args.requestType === 'eventCreate' ||
      args.requestType === 'eventChange'
    ) {
      let tache = new Tache();
      tache.idTache = null;
      tache.ville = args.data[0].location;
      tache.typeTravaux = args.data[0].typetache;
      tache.libelle = args.data[0].Subject;

      const dateDebutDateString = args.data[0].StartTime;

      const dateDebutDateObject = new Date(dateDebutDateString);

      const year = dateDebutDateObject.getUTCFullYear();
      const month = (dateDebutDateObject.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0');
      const day = dateDebutDateObject.getUTCDate().toString().padStart(2, '0');

      const formattedDateDevut = `${year}-${month}-${day}`;

      console.log(formattedDateDevut);

      tache.dateDebut = formattedDateDevut;

      const dateFinDateString = args.data[0].StartTime;

      const dateFinDateObject = new Date(dateFinDateString);

      const yearFin = dateFinDateObject.getUTCFullYear();
      const monthFin = (dateFinDateObject.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0');
      const dayFin = dateFinDateObject.getUTCDate().toString().padStart(2, '0');

      const formattedDateFin = `${yearFin}-${monthFin}-${dayFin}`;

      console.log(formattedDateFin);

      tache.dateFin = formattedDateFin;

      const dateDebutString = args.data[0].StartTime;
      const dateDebutObject = new Date(dateDebutString);
      const hours = dateDebutObject.getUTCHours().toString().padStart(2, '0');
      const minutes = dateDebutObject
        .getUTCMinutes()
        .toString()
        .padStart(2, '0');
      const timeDebut = `${hours}:${minutes}`;

      console.log(timeDebut);

      tache.heureDebut = timeDebut;

      const dateFinString = args.data[0].EndTime;
      const dateFinObject = new Date(dateFinString);
      const hoursFin = dateFinObject.getUTCHours().toString().padStart(2, '0');
      const minutesFin = dateFinObject
        .getUTCMinutes()
        .toString()
        .padStart(2, '0');
      const timeFin = `${hoursFin}:${minutesFin}`;

      tache.heureFin = timeFin;
      tache.commantaire = args.data[0].Description;
      tache.idChantier = new Chantier(args.data[0].chantier);

      const chefEquipeString = args.data[0].chefequipe;

      tache.responsable = new Collaborateur(parseInt(chefEquipeString, 10));
      tache.nomCompletResponsable = null;
      tache.nomCompletChantier = null;
      tache.typeTache = 'tache';

      this.addTacheService.addOrUpdateTache(tache);

      for (var i = 0; i < args.data.length; i++) {
        this.selectedSalaries.push(args.data[i].EmployeeId);
      }

      this.addAffectationService.addOrUpdateAffectationList(
        this.selectedSalaries
      );

      console.log('############', args.data[0]);
    }
    if (args.requestType === 'eventChange') {
    }
    if (args.requestType === 'eventRemove') {
      this.http
        .get<any>(
          this.host + urlsConstantsTache.urlTache + args.data[0].TacheId
        )
        .toPromise();
    }

    /*if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      const data: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
      if (!this.scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date)) {
        args.cancel = true;
      }
    }*/

    /*
    let libelle: String = this.TacheForm.get('intitule').value;
    let dateDebut: String = this.TacheForm.get('dateDebut').value;
    let dateFin: String = this.TacheForm.get('dateFin').value;
    let heureDebut: String = this.TacheForm.get('heureDebut').value;
    let heureFin: String = this.TacheForm.get('heureFin').value;
    let commantaire: String = this.TacheForm.get('commentaire').value;
    let idChantier: number = this.TacheForm.get('chantier').value;
    let idSalarie: number = this.TacheForm.get('idCollaborateur').value;
    let typeTravaux: String = this.TacheForm.get('typeTravaux').value;
    let tache = new Tache();
    tache.idTache = null;
    tache.typeTravaux = typeTravaux;
    tache.libelle = libelle;
    tache.dateDebut = dateDebut;
    tache.dateFin = dateFin;
    tache.heureDebut = heureDebut;
    tache.heureFin = heureFin;
    tache.commantaire = commantaire;
    tache.idChantier = new Chantier(idChantier);
    tache.responsable = new Collaborateur(idSalarie);
    tache.nomCompletResponsable = null;
    tache.nomCompletChantier = null;
    tache.typeTache = 'tache';

    this.selectedSalaries.push(idSalarie);

    console.log("fffff");
    
    console.log(this.selectedSalaries);
    console.log("ggg");

    this.addTacheService
      .addOrUpdateTache(tache)
      .then((res) => {
        this.toast.success(
          this.translate.instant('Tache ajoutée avec succés'),
          '',
          Constants.toastOptions
        );

        this.addAffectationService
          .addOrUpdateAffectationList(this.selectedSalaries)
          .then((res) => {
            this.toast.success(
              this.translate.instant('Affectation  ajoutée avec succés'),
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

        this.router.navigate(['pilpose/tache']);
      })
      .catch((error) => {
        this.toast.error(
          this.translate.instant('Erreur lors de la création d une tache'),
          '',
          Constants.toastOptions
        );
      });

*/
  }

  public onActionComplete(): void {}
}
