import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HostService } from '../service/host.service';
import { HttpClientRequest } from '../service/http-request.service';
import { SofappsHomeService } from '../welcome/sofapps-home/sofapps-home.service';
import { UserModel } from './model/user.model';

import { authUrlsConstants } from './utils/urls-constants';

/**
 * Admins Domain service
 */
@Injectable({
  providedIn: 'root',
})
export class LoginAdminService {
  /**
   * Back end auth host
   */
  private readonly host;



  /**
   *
   * @param http
   * @param hostService
   * @param router
   * @param httpClient

   */
  constructor(
    private http: HttpClient,
    private hostService: HostService,
    private sofappsHomeService: SofappsHomeService,
    private router: Router,
    private httpClient: HttpClientRequest,


  ) {
    this.host = this.hostService.getPilposeHost;
  }

  /**
   * Demande d'authentification + encodage password
   *
   * @param username
   * @param password
   */
  authUser(user: UserModel) {
    return this.http.post(this.hostService.getPilposeHost() + authUrlsConstants.urlAuthentication, user );
  }

  isLogged() {
    let loggeduser = localStorage.getItem('currentUser');
    return !!loggeduser;
  }

  /**
   * is maintenance mode active
   */
  isMaintenance() {
    return this.httpClient.getObject(
      this.hostService.getPilposeHost() + authUrlsConstants.urlIsMaintenance
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      // window.location.reload();
      this.router.navigate(['/login']);
    });
  }

  /**
   * initialize vars of token timeout
   */

}
