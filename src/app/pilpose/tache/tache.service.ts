import { HttpClient } from '@angular/common/http';
import { HostService } from 'src/app/service/host.service';
import { urlsConstantsTache } from '../tache/urlsConstants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  public host: string;
  constructor(private http: HttpClient, private hostService: HostService) {
    this.host = this.hostService.getPilposeHost();
  }

  getAllTache(): Promise<any> {
    return this.http.get(this.host + urlsConstantsTache.urlTache).toPromise();
  }

  deleteTache(idTache: any): Promise<any> {
    return this.http
      .delete<any>(this.host + urlsConstantsTache.urlTache + idTache)
      .toPromise();
  }
}
