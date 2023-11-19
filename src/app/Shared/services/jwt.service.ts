import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private jwtHelper: JwtHelperService) {}

  /**
   *
   * @param token
   * @returns
   */
  getTokenDecoded(token: string) {
    return JSON.parse(JSON.stringify(this.jwtHelper.decodeToken(token)));
  }

  /**
   *
   * @param token
   * @returns
   */
  getTokenExpirationDate(token: string) {
    return this.jwtHelper.getTokenExpirationDate(token);
  }
}
