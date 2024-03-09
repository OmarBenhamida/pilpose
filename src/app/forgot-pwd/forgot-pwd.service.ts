import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { authUrlsConstants } from "../login-admin/utils/urls-constants";
import { HostService } from "../service/host.service";
import { HttpClientRequest } from "../Shared/services/common/http-request.service";
import { forgotPwdModel } from "./forgotPwd.model";

/**
 * Admins Domain service
 */
 @Injectable({
    providedIn: 'root',
  })
  export class ForgotPwdService {

    public host: string;
    constructor(
        private http: HttpClient,
        private hostService: HostService,
      
        private router: Router,
        private httpClient: HttpClientRequest,
    
    
      ) {
        this.host = this.hostService.getPilposeHost();
      }


      forgotPwd(user: forgotPwdModel) {

     
       return this.httpClient
       .postObject<any>(
        user,
         this.host +  authUrlsConstants.urlForgotPwd
       ).toPromise();
     
      }
    
    

  }