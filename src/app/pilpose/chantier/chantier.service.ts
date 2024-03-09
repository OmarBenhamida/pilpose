import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChantierModel } from 'src/app/model/chantierModel';
import { Chantier } from 'src/app/model/chantier.model';
import { HostService } from 'src/app/service/host.service';

import { HttpClientRequest } from 'src/app/Shared/services/common/http-request.service';
import { urlsConstantsChantier } from './urlsConstants';



@Injectable({
  providedIn: 'root',
})
export class ChantierService {
  public host: string;

  constructor(
    private http: HttpClient,
    private hostService: HostService
  ) {
    this.host = this.hostService.getPilposeHost();
  }

  getAllChantier(): Promise<any> {
    return this.http.get(this.host + urlsConstantsChantier.urlChantier).toPromise();
  }

  getAllVille(): Promise<any> {
    return this.http.get(this.host + urlsConstantsChantier.urlVilles).toPromise();
  }

  exportFile(): Promise<any> {
    return this.http.get(this.host + urlsConstantsChantier.urlExport).toPromise();
  }

 


    deleteChantier(idChantier: number): Promise<any> {
      return this.http
        .get<any>(
          this.host + urlsConstantsChantier.urlChantier  + idChantier
        ).toPromise();
    }
    
  

}
