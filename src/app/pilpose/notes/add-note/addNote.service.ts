import { Injectable } from "@angular/core";
import { Tache } from "src/app/model/tache.model";
import { HostService } from 'src/app/service/host.service';

import { HttpClientRequest } from 'src/app/shared/services/common/http-request.service';
import { urlsConstantsNote } from "../urlsConstants";
import { NoteFrais } from "src/app/model/note-frais.model";

@Injectable({
    providedIn: 'root',
  })
  export class AddNoteService {

    public host: string;

    constructor(
      private http: HttpClientRequest,
      private hostService: HostService
    ) {
      this.host = this.hostService.getPilposeHost();
    }


    addOrUpdateNote(note : NoteFrais): Promise<any> {
    
    
        
        return this.http
          .postObject<any>(
            note,
            this.host + urlsConstantsNote.urlNote
          ).toPromise();
        
  
          
          
      }
  }