import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlannigComponent } from './plannig.component';
import {  ScheduleAllModule
  } from '@syncfusion/ej2-angular-schedule';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        PlannigComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,

        ScheduleAllModule,
        RouterModule.forChild([
            { path: '', component: PlannigComponent, },
        ]),
        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),

        // SharedModule
    ],
})

export class PlanningModule { }
