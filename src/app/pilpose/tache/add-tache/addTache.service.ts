import { Injectable } from "@angular/core";
import { Tache } from "src/app/model/tache.model";
import { HostService } from 'src/app/service/host.service';

import { HttpClientRequest } from 'src/app/shared/services/common/http-request.service';
import { urlsConstantsTache } from "../urlsConstants";

@Injectable({
    providedIn: 'root',
  })
  export class AddTachService {

    public host: string;

    constructor(
      private http: HttpClientRequest,
      private hostService: HostService
    ) {
      this.host = this.hostService.getPilposeHost();
    }


    addOrUpdateTache(tache : Tache): Promise<any> {
      
        console.log("tache: ", tache);
        
        return this.http
          .postObject<any>(
            tache,
            this.host + urlsConstantsTache.urlTache
          ).toPromise();
        
  
          
          
      }
  }