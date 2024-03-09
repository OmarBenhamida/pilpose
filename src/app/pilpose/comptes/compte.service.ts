import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChantierModel } from 'src/app/model/chantierModel';
import { Chantier } from 'src/app/model/chantier.model';
import { HostService } from 'src/app/service/host.service';

import { HttpClientRequest } from 'src/app/Shared/services/common/http-request.service';
import { urlsConstantsCompte } from '../chantier/urlsConstants';



@Injectable({
  providedIn: 'root',
})
export class CompteService {
  public host: string;

  constructor(
    private http: HttpClient,
    private hostService: HostService
  ) {
    this.host = this.hostService.getPilposeHost();
  }

  getAllComptes(): Promise<any> {
    return this.http.get(this.host + urlsConstantsCompte.urlCompte).toPromise();
  }


    deleteCompte(idCompte: any): Promise<any> {
      return this.http
        .get<any>(
          this.host + urlsConstantsCompte.urlCompte  + idCompte
        ).toPromise();
    }
    

    exportFile(): Promise<any> {
      return this.http.get(this.host + urlsConstantsCompte.urlExport).toPromise();
    }

    getAllCp(): Promise<any> {
      return this.http.get(this.host + urlsConstantsCompte.urlColaborateurCp).toPromise();
    }

    getAllRt(): Promise<any> {
      return this.http.get(this.host + urlsConstantsCompte.urlColaborateurRt).toPromise();
    }
  
  

}
