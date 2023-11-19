import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatesFilter } from '../..//recrutement/model/DatesFilter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSource = new BehaviorSubject('');
  currentFilter = this.filterSource.asObservable();

  private demandeStatusSource = new BehaviorSubject('');
  currentdemandeStatus = this.demandeStatusSource.asObservable();

  private datesFilterSource = new BehaviorSubject({dateMin: '',dateMax: ''});
  currentDatesFilter = this.datesFilterSource.asObservable();

  constructor() { }
  /**
   *
   * @param filter
   */
  changeFilter(filter:string){
    this.filterSource.next(filter);
  }
  /**
   *
   * @param dateRange
   */
  changeDatesFilter(dateRange:DatesFilter){
    this.datesFilterSource.next(dateRange);
  }
  /**
   *
   * @param demandeStatus
   */
  changeDemandeStatusFilter(demandeStatus:any){
    this.demandeStatusSource.next(demandeStatus);
  }

}
