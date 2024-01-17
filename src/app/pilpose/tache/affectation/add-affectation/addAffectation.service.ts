import { Injectable } from '@angular/core';
import { Tache } from 'src/app/model/tache.model';
import { HostService } from 'src/app/service/host.service';

import { HttpClientRequest } from 'src/app/shared/services/common/http-request.service';
import { urlsConstantsAffectation } from '../urlsConstants';
import { Affectation } from 'src/app/model/affectation.model';
import { UpdateTacheAffectation } from 'src/app/model/updateTache.model';

@Injectable({
  providedIn: 'root',
})
export class AddAffectationService {
  public host: string;

  constructor(
    private http: HttpClientRequest,
    private hostService: HostService
  ) {
    this.host = this.hostService.getPilposeHost();
  }

  addOrUpdateAffectation(tache: Affectation): Promise<any> {
    return this.http
      .postObject<any>(tache, this.host + urlsConstantsAffectation.urlAffe)
      .toPromise();
  }

  addOrUpdateAffectationList(ids: Number[]): Promise<any> {
    return this.http
      .postObject<any>(
        ids,
        this.host + urlsConstantsAffectation.urlAffectationList
      )
      .toPromise();
  }

  updateAffectationList(obj: UpdateTacheAffectation): Promise<any> {
    return this.http
      .postObject<any>(
        obj,
        this.host + urlsConstantsAffectation.updateListAffectation
      )
      .toPromise();
  }
}
