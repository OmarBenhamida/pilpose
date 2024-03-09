import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/model/client.model';
import { HostService } from 'src/app/service/host.service';
import { HttpClientRequest } from 'src/app/Shared/services/common/http-request.service';
import { urlsConstantsClient } from '../chantier/urlsConstants';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public host: string;

  constructor(
    private http: HttpClient,
    private https: HttpClientRequest,
    private hostService: HostService
  ) {
    this.host = this.hostService.getPilposeHost();
  }

  getAllClient(): Promise<any> {
    return this.http.get(this.host + urlsConstantsClient.urlClient).toPromise();
  }

  deleteClient(idClient: number): Promise<any> {
    return this.http
      .get<any>(this.host + urlsConstantsClient.urlClient + idClient)
      .toPromise();
  }

  addOrUpdateClient(chantier: Client): Promise<any> {
    

    return this.https
      .postObject<any>(chantier, this.host + urlsConstantsClient.urlClient)
      .toPromise();
  }

  exportFile(): Promise<any> {
    return this.http.get(this.host + urlsConstantsClient.urlExport).toPromise();
  }
}
