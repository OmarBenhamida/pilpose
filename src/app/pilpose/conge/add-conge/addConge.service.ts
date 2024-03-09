import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChantierModel } from 'src/app/model/chantierModel';
import { Chantier } from 'src/app/model/chantier.model';
import { HostService } from 'src/app/service/host.service';

import { HttpClientRequest } from 'src/app/Shared/services/common/http-request.service';
import { urlsConstantsConge } from '../urlsConstants';
import { Conge } from 'src/app/model/conge.model';




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




    addOrUpdateConge(conger : Conge): Promise<any> {
      
     
      
      return this.http
        .postObject<any>(
          conger,
          this.host + urlsConstantsConge.urlConge
        ).toPromise();
      

        
        
    }
    
  
 
  

}
