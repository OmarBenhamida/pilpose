import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { BehaviorSubject, of, tap } from 'rxjs';
import { PlanningDto } from 'src/app/model/planning.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  urlAffectation: string = '/planning/v0/';

  constructor(private http: HttpClient) { }

  getList() {
   const user  : number = Number(localStorage.getItem('idUser'));
    return this.http.get<PlanningDto[]>(environment.pilposeHost + this.urlAffectation+user);
  }

/*  getList() {
    return this.listPlannings;
  }*/
}
