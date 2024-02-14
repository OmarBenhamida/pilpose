import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localisation } from 'src/app/model/localisation.model';

import { HostService } from 'src/app/service/host.service';
import { HttpClientRequest } from 'src/app/shared/services/common/http-request.service';
import { urlsConstantslocalisation } from '../chantier/urlsConstants';

@Injectable({
  providedIn: 'root',
})
export class LocalisationService {
  public host: string;

  constructor(
    private http: HttpClient,
    private https: HttpClientRequest,
    private hostService: HostService
  ) {
    this.host = this.hostService.getPilposeHost();
  }

  getAllLocalisation(): Promise<any> {
    return this.http
      .get(this.host + urlsConstantslocalisation.urlLocalisation)
      .toPromise();
  }

  deleteLocalisation(idLocalisation: number): Promise<any> {
    return this.http
      .get<any>(
        this.host + urlsConstantslocalisation.urlLocalisation + idLocalisation
      )
      .toPromise();
  }

  addOrUpdateLocalisation(chantier: Localisation): Promise<any> {
    return this.https
      .postObject<any>(
        chantier,
        this.host + urlsConstantslocalisation.urlLocalisation
      )
      .toPromise();
  }

  exportFile(): Promise<any> {
    return this.http
      .get(this.host + urlsConstantslocalisation.urlExport)
      .toPromise();
  }
}
