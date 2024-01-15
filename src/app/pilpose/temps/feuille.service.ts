import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/service/host.service';
import { urlsConstantsTache } from '../tache/urlsConstants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeuilleService {
  public host: string;
  constructor(private http: HttpClient, private hostService: HostService) {
    this.host = this.hostService.getPilposeHost();
  }

  getAllFeuilleChantier(): Promise<any> {
    return this.http.get(this.host + urlsConstantsTache.urlFeuilChantier).toPromise();
  }

  getAllFeuilleSalarie(): Promise<any> {
    return this.http.get(this.host + urlsConstantsTache.urlFeuilSalarie).toPromise();
  }
  

}
