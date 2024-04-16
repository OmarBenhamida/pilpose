import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from 'src/app/service/host.service';
import { urlsConstantsConge } from './urlsConstants';

@Injectable({
  providedIn: 'root'
})
export class AccueilPageService {

  public host: string;
  constructor(private http: HttpClient, private hostService: HostService) {
    this.host = this.hostService.getPilposeHost();
  }

  getCountConge(): Promise<any> {
    return this.http.get(this.host + urlsConstantsConge.urlConge).toPromise();
  }

  getCountCongeRT(): Promise<any> {
    return this.http.get(this.host + urlsConstantsConge.urlCongeRT).toPromise();
  }


  getCountFeuille(): Promise<any> {
    return this.http.get(this.host + urlsConstantsConge.urlFeuille).toPromise();
  }

  getCountFeuilleRT(): Promise<any> {
    return this.http.get(this.host + urlsConstantsConge.urlFeuilleRT).toPromise();
  }

  getCountFeuilleCE(): Promise<any> {
    return this.http.get(this.host + urlsConstantsConge.urlFeuilleCE).toPromise();
  }
 
}
