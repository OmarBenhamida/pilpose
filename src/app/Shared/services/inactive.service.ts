import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/interval';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class InactiveService {

    /*Time of inactivity of an user */
    secondes: number;
    counterSubscription: Subscription;

    /*popup settings*/
    message: string = 'Vous êtes resté longtemps inactif';
    btn1: string = 'Restaurer la session';
    btn2: string = 'Fermer la session';
    icon: string = '../../../../assets/img/report-24px.svg'

    constructor(public dialog: MatDialog) {
    }

    inactive() {
        const counter = Observable.interval(20 * 60000); //20 minutes
    }

    /**
     * inactive's counter reloading
     */
    reloadCounter() {
        if (this.counterSubscription) {
            this.counterSubscription.unsubscribe();
            this.inactive();
        }
    }

    /**
     * inactive's counter unsubscribtion
     */
    stopCounter() {
        if (this.counterSubscription) {
            this.counterSubscription.unsubscribe();
        }
    }

}
