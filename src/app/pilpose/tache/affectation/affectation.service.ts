import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/service/host.service';

import { Injectable } from '@angular/core';
import { urlsConstantsAffectation } from '../../chantier/urlsConstants';

@Injectable({
  providedIn: 'root',
})
export class AffectationService {
  public host: string;
  constructor(private http: HttpClient, private hostService: HostService) {
    this.host = this.hostService.getPilposeHost();
  }

  getAllAffecattion(): Promise<any> {
    return this.http.get(this.host + urlsConstantsAffectation.urlAffectation).toPromise();
  }

  deleteAffecattion(idAffecatation: any): Promise<any> {
    return this.http
      .get<any>(this.host + urlsConstantsAffectation.urlAffectation + idAffecatation)
      .toPromise();
  }
 

  exportFile(): Promise<any> {
    return this.http.get(this.host + urlsConstantsAffectation.urlExport).toPromise();
  }
}
