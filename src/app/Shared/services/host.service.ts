import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class HostService {
    sirhusHost: string;

    constructor() {
        this.sirhusHost = environment.sirhusHost;
    }

    getSirhusHost() {
        return this.sirhusHost;
    }
}
