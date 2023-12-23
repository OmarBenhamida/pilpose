import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, inject, OnInit, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from 'date-fns';
import { Subject, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CalendarService } from './calendar.service';
import { PlanningDto } from 'src/app/model/planning.model';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-plannig',
  templateUrl: './plannig.component.html',
  styleUrls: ['./plannig.component.css']
})
export class PlannigComponent  {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  readonly service = inject(CalendarService);

  readonly plainning$ = this.service.getList().pipe(
    map(list => {
      const _list = list.map(e => ({
        start: new Date(e.idTache.dateDebut as any),
        end: new Date(e.idTache.dateFin as any),
        title: e.idTache.libelle,
        color: { ...colors.yellow },
        ...e,
      }));

      console.warn(_list)

      return _list as (CalendarEvent & PlanningDto)[];
    })
  );

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: CalendarEvent & PlanningDto;

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) { }


  handleEvent(action: string, event: CalendarEvent & PlanningDto): void {
    this.modalData = event;
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

}
