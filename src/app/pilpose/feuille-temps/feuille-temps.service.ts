import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/service/host.service';
import { urlsConstantsFeuilleTemps } from './urlsConstants';
@Injectable({
  providedIn: 'root'
})
export class FeuilleTempsService {

  public host: string;
  constructor(private http: HttpClient, private hostService: HostService) {
    this.host = this.hostService.getPilposeHost();
  }

  getAllFeuille(): Promise<any> {
    return this.http.get(this.host + urlsConstantsFeuilleTemps.urlFeuille).toPromise();
  }

  getAllCp(): Promise<any> {
    return this.http.get(this.host + urlsConstantsFeuilleTemps.urlColaborateurCp).toPromise();
  }

  deleteTache(idTache: any): Promise<any> {
    return this.http
      .get<any>(this.host + urlsConstantsFeuilleTemps.urlFeuille + idTache)
      .toPromise();
  }

  exportFile(): Promise<any> {
    return this.http.get(this.host + urlsConstantsFeuilleTemps.urlExport).toPromise();
  }





}
