import { Injectable } from '@angular/core';
import { urlsConstants } from '../utils/urlsConstants';
import { HttpClientRequest } from './common/http-request.service';
import { HostService } from './host.service';

@Injectable({
  providedIn: 'root'
})
export class LanguesService {

  host: string;
  constructor(private http: HttpClientRequest, private hostService: HostService) { 
    this.host = this.hostService.getSirhusHost();
   }
   
   getListLanguage(){
    return this.http.getObject( this.host + urlsConstants.urlGetLanguages);
   }
}
