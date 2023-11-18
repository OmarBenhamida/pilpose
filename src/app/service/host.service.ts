import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class HostService {
  sofappsHost: string;

    constructor() {
        this.sofappsHost = environment.sofappsHost;
    }

    getSofappsHost() {
        return this.sofappsHost;
    }
}
