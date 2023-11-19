import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HostService } from 'src/app/service/host.service';
import { urlsConstants } from 'src/app/Shared/utils/urlsConstants';

@Injectable({
  providedIn: 'root',
})
export class SofappsHomeService {
  private fullNameSubject = new Subject<string>();

  host: string;

  constructor(private hostService: HostService, private http: HttpClient) {
    this.host = this.hostService.getPilposeHost();
  }

  /**
   *
   * @param fullName
   */
  setFullNameSubject(fullName: string) {
    this.fullNameSubject.next(fullName);
  }

  /**
   *
   * @returns
   */
  getFullNameSubjectAsObsrv() {
    return this.fullNameSubject.asObservable();
  }

  /**
   * retourne depuis endpoint les info collab
   * @param username
   * @returns
   */

  getinfoFromLdap(username: string): Observable<any> {
    return this.http.get(this.host + urlsConstants.urlGetInfo + username);
  }
}
