import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChantierModel } from 'src/app/model/chantierModel';
import { Chantier } from 'src/app/model/chantier.model';
import { HostService } from 'src/app/service/host.service';

import { HttpClientRequest } from 'src/app/shared/services/common/http-request.service';
import { urlsConstantsConge } from '../urlsConstants';




@Injectable({
  providedIn: 'root',
})
export class AddCongeService {
  public host: string;

  constructor(
    private http: HttpClientRequest,
    private hostService: HostService
  ) {
    this.host = this.hostService.getPilposeHost();
  }




    addOrUpdateConge(chantier : Chantier): Promise<any> {
      
      console.log("chantier: ", chantier);
      
      return this.http
        .postObject<any>(
          chantier,
          this.host + urlsConstantsConge.urlConge
        ).toPromise();
      

        
        
    }
    
  
 
  

}
