import { SofappsHomeService } from './../welcome/sofapps-home/sofapps-home.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs';
import { map } from 'rxjs/operators';
import { HostService } from '../service/host.service';
import { CurrentUserModel } from './model/current-user.model';
import { authUrlsConstants } from './utils/urls-constants';

/**
 * Admins Domain service
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
    private router: Router,
    private hostService: HostService,
    private sofappsHomeService: SofappsHomeService,
    private httpClient: HttpClient
  ) {
    this.host = this.hostService.getPilposeHost();
  }

  /**
   * Demande d'authentification + encodage password
   *
   * @param username
   * @param password
   */
  authUser(username: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.httpClient
      .post<any>(
        this.hostService.getPilposeHost() + authUrlsConstants.urlAuthentication,
        null,
        { headers }
      )
      .pipe(
        map((user: CurrentUserModel) => {
          /* store user details and jwt token in local storage to keep user logged in between page refreshes */
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.sofappsHomeService.setFullNameSubject(user.nom_complet);
          return user;
        })
      );
  }

  isLogged() {
    let loggeduser = localStorage.getItem('currentUser');
    return !!loggeduser;
  }

  /**
   * is maintenance mode active
   */
  isMaintenance() {
    return this.httpClient.get(
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
}
