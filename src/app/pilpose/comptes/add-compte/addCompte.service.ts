import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChantierModel } from 'src/app/model/chantierModel';
import { Chantier } from 'src/app/model/chantier.model';
import { HostService } from 'src/app/service/host.service';

import { HttpClientRequest } from 'src/app/Shared/services/common/http-request.service';
import { urlsConstantsCompte } from '../../chantier/urlsConstants';
import { Collaborateur } from 'src/app/model/collaborateur.model';





@Injectable({
  providedIn: 'root',
})
export class AddCompteService {
  public host: string;

  constructor(
    private http: HttpClientRequest,
    private hostService: HostService
  ) {
    this.host = this.hostService.getPilposeHost();
  }




    addOrUpdateCollab(collab : Collaborateur): Promise<any> {
      
      return this.http
        .postObject<any>(
            collab,
          this.host + urlsConstantsCompte.urlCompte
        ).toPromise();
      

        
        
    }
    
  
 
  

}
