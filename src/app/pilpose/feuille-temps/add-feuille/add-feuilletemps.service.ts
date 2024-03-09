import { Injectable } from '@angular/core';
import { FeuilleTemps } from 'src/app/model/feuille-temps.model';
import { HostService } from 'src/app/service/host.service';
import { HttpClientRequest } from 'src/app/Shared/services/common/http-request.service';
import { urlsConstantsFeuilleTemps } from '../urlsConstants';

@Injectable({
  providedIn: 'root',
})
export class AddFeuilletempsService {
  public host: string;

  constructor(
    private http: HttpClientRequest,
    private hostService: HostService
  ) {
    this.host = this.hostService.getPilposeHost();
  }

  addOrUpdateFeuille(tache: FeuilleTemps): Promise<any> {
    return this.http
      .postObject<any>(tache, this.host + urlsConstantsFeuilleTemps.urlFeuille)
      .toPromise();
  }
}
