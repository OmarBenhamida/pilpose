import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from '../../utils/utils';


const URL_BOUCHON = '';

@Injectable()
export class HttpClientRequest {

  utils = Utils;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get object method
   * '@param' url_append
   * '@param' 'isBouchon
   * '@param' option
   */
  public getObject<T>(url_append: string, isBouchon?: boolean, option?: {}): Observable<T> {
    return this.httpClient.get<any>((isBouchon ? URL_BOUCHON : url_append), !this.utils.isNullOrUndefined(option) ? option : this.initOptionHeader());
  }

  /**
   *
   * '@param' body
   * '@param' url_append
   * '@param' isAuth
   * '@param' isBouchon
   * '@param' option
   */
  public postObject<T>(body: Object, url_append: string, isAuth?: boolean, isBouchon?: boolean, option?: {}): Observable<T> {
    return this.httpClient.post<T>((isBouchon ? URL_BOUCHON : url_append), body, !this.utils.isNullOrUndefined(option) ? option : this.initOptionHeader());
  }

  /**
   *
   * '@param' body
   * '@param' url_append
   * '@param' isBouchon
   * '@param' option
   */
  public updateObject<T>(body: Object, url_append: string, isBouchon?: boolean, option?: {}): Observable<T> {
    return this.httpClient.put<T>((isBouchon ? URL_BOUCHON : url_append), body, !this.utils.isNullOrUndefined(option) ? option : this.initOptionHeader());

  }

  /**
   *
   * '@param' url_append
   * '@param' isBouchon
   * '@param' option
   */
  public deleteObject<T>(url_append: string, isBouchon?: boolean, option?: {}): Observable<T> {
    return this.httpClient.delete<T>((isBouchon ? URL_BOUCHON : url_append), !this.utils.isNullOrUndefined(option) ? option : this.initOptionHeader());
  }

  /**
   * initialisation option header image BLOB
   * @returns 
   */
  initOptionHeaderForBlob() {
    const options = {
      headers: this.initHttpHeader(),
      responseType: 'blob' as 'blob'
    };
    return options;
  }

  initOptionHeader() {
    const options = {
      headers: this.initHttpHeader()
    };
    return options;
  }

  initHttpHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
    });
  }

}
