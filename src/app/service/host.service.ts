import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class HostService {
  pilposeHost: string;

    constructor() {
        this.pilposeHost = environment.pilposeHost;
    }

    getPilposeHost() {
        return this.pilposeHost;
    }
}
