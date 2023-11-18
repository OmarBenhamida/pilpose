import { observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/service/host.service';
import { urlsConstants } from 'src/app/Shared/utils/urlsConstants';
import { ParametrageModel } from 'src/app/model/ParametrageModel';
import { HttpClientRequest } from 'src/app/service/http-request.service';

@Injectable({
  providedIn: 'root',
})
export class ParametrageService {
  host: string;
  Id: number = 7;

  constructor(
    private http: HttpClientRequest,

    private hostService: HostService
  ) {
    this.host = this.hostService.getSofappsHost();
  }

  getParametrageActuel() {
    return this.http.getObject(
      this.host + urlsConstants.urlGetAllParametrage
    );
  }
  UpdateParametrage(parametrage: ParametrageModel []) {
    return this.http.updateObject(
      parametrage,
      this.host + urlsConstants.urlUpdateParametrage,
      false,
      false
    );
  }
}
