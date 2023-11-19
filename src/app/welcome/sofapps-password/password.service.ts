import { observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/service/host.service';
import { urlsConstants } from 'src/app/Shared/utils/urlsConstants';
import { ParametrageModel } from 'src/app/model/ParametrageModel';
import { HttpClientRequest } from 'src/app/service/http-request.service';
import { PasswordModel } from 'src/app/model/PasswordModel';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  host: string;

  constructor(
    private http: HttpClientRequest,

    private hostService: HostService
  ) {
    this.host = this.hostService.getPilposeHost();
  }


  UpdatePassword(password: PasswordModel) {
    return this.http.updateObject(
      password,
      this.host + urlsConstants.urlUpdatePassword,
      false,
      false
    );
  }
}
