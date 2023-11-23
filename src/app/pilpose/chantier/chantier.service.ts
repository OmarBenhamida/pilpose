import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChantierModel } from 'src/app/model/chantierModel';
import { chantier } from 'src/app/model/chantier.model';
import { HostService } from 'src/app/service/host.service';

import { HttpClientRequest } from 'src/app/shared/services/common/http-request.service';
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



    addOrUpdateChantier(chantier : chantier): Promise<any> {
      /*return this.http
        .postObject<any>(
          chantier,
          this.host + urlsConstantsChantier.urlChantier
        ).toPromise();*/
        return this.http.post(urlsConstantsChantier.urlChantier,chantier).toPromise();
    }
    
  
    deleteChantier(idChantier: any): Promise<any> {
      return this.http
        .get<any>(
          this.host + urlsConstantsChantier.urlChantier  + idChantier
        ).toPromise();
    }
    
  

}
