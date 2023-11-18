import { lastValueFrom, map, Observable, Subject } from 'rxjs';
import { PasswordService } from './password.service';
import { PasswordModel } from './../../model/PasswordModel';
import { Router } from '@angular/router';
import {  Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ParametrageModel } from 'src/app/model/ParametrageModel';
import { ParametrageService } from '../sofapps-parametrage/parametrage.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { SnackBarNotifService } from 'src/app/service/snack-bar-notif.service';
import { messages } from 'src/app/Shared/utils/messages';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 *
 */
export interface PasswordValidator {
  maj: number;
  min: number;
  chifre: number;
  caractereSecial: number;
  caractereMinimum: number;
}

@Component({
  selector: 'app-sofapps-password',
  templateUrl: './sofapps-password.component.html',
  styleUrls: ['./sofapps-password.component.css'],
})
export class SofappsPasswordComponent implements OnInit {
  myForm!: FormGroup;
  res: ParametrageModel[];
  compare = false;
  checkPassword = false;
  maj: number = 0;
  min: number = 0;
  chifre: number = 0;
  caractereSecial: number = 0;
  caractereMinimum: number = 0;
  dureeMdp: number;
  newPass: PasswordModel;
  passwordValidators: any;
  PasswordValidatorArr: any[] = [];
  hide: boolean = true;
  hideNew: boolean = true;
  hideConfirNew: boolean = true;
  promisPass: Promise<any>;
  passwordValSub: Subject<any> = new Subject<any>();

  constructor(
    private route: Router,
    private parametrageService: ParametrageService,
    private snackBarNotifService: SnackBarNotifService,
    private passwordService: PasswordService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<SofappsPasswordComponent>
  ) {}



  async ngOnInit() {
    this.passwordValidators = await this.loadParametrage();
    this.PasswordValidatorArr = this.passwordValidators;

    localStorage.setItem(
      'passworVal',
      JSON.stringify(this.PasswordValidatorArr)
    );

    console.log(this.PasswordValidatorArr);

    this.maj = this.PasswordValidatorArr.filter(
      (v) => v.code === 'MAJ'
    )[0]?.valeur;
    console.log(this.maj);
    this.chifre = this.PasswordValidatorArr.filter(
      (v) => v.code === 'C'
    )[0]?.valeur;
    this.caractereSecial = this.PasswordValidatorArr.filter(
      (v) => v.code === 'CS'
    )[0]?.valeur;
    this.caractereMinimum = this.PasswordValidatorArr.filter(
      (v) => v.code === 'CM'
    )[0]?.valeur;
    this.dureeMdp = this.PasswordValidatorArr.filter(
      (v) => v.code === 'DMDP'
    )[0]?.valeur;
    this.min = this.PasswordValidatorArr.filter(
      (v) => v.code === 'MIN'
    )[0]?.valeur;
    this.myForm = new FormGroup({
      ancienMdp: new FormControl('', Validators.required),
      nouveauMdp: new FormControl('', [
        Validators.required,
        this.majRegexValidator,
        this.minRegexValidator,
        this.numRegexValidator,
        this.csRegexValidator,
        this.lenRegexValidator,
      ]),
      conifrmationNouveauMp: new FormControl('', [
        Validators.required,
        RxwebValidators.compare({ fieldName: 'nouveauMdp' }),
      ]),
    });
  }

  // transform(value: string, userProp?: any): any {
  //   return this.userService.getUser(value).pipe(
  //     map((res) => {
  //       // changed the subscribe
  //       let userData; // scoping it inside the return
  //       userData = res;
  //       if (!userProp) {
  //         return userData;
  //       } else {
  //         const prop =
  //           userProp === 'displayName'
  //             ? `${userData.firstName} ${userData.lastName}`
  //             : oneProjectUser(value)[userProp];
  //         return prop;
  //       }
  //     })
  //   );
  // }

  /**
   *  Charge les parametrage epuis la base de données
   * @returns array of parametrage
   */
  loadParametrage() {
    return this.parametrageService.getParametrageActuel().toPromise();
  }

  /**
   *
   * Récupére la valeur du champs nouveau mot de passe
   * @readonly
   * @memberof SofappsPasswordComponent
   */
  get nouveauMdp() {
    return this.myForm.get('nouveauMdp');
  }

  onCancel() {
    this.route.navigateByUrl('/welcome/home').then(() => {});
  }

  /**
   * Change le mot de passe en faisons appelle au service dédié
   */
  onSubmit() {
    this.newPass = {
      username: JSON.parse(localStorage.getItem('currentUser'))?.user_name,
      oldPassword: this.myForm.value.ancienMdp,
      newPassword: this.myForm.value.nouveauMdp,
    };
    this.passwordService.UpdatePassword(this.newPass).subscribe(
      (res) => {
        this.snackBarNotifService.openSnackBarSuccess(
          messages.password,

          this.translate.instant(messages.fermer)
        );

        this.dialogRef.close(res);
      },

      (error) => {
        this.snackBarNotifService.openSnackBarFailure(
          messages.passwordEchoue,

          this.translate.instant(messages.fermer)
        );

        this.dialogRef.close(error);
      }
    );
  }

  /**
   *
   * @param c
   * @returns
   */
  majRegexValidator(c: FormControl) {
    let passVal: any[] = JSON.parse(localStorage.getItem('passworVal'));
    passVal = passVal?.filter((v) => v.code === 'MAJ');

    let regMaj = '(?=(.*[A-Z]){' + passVal[0]?.valeur + '})';
    let regMajj = new RegExp(regMaj);
    if (regMajj.test(c.value)) {
      return null;
    } else {
      return { majRegex: true };
    }
  }

  /**
   *
   * @param c
   * @returns
   */
  minRegexValidator(c: FormControl) {
    let passVal: any[] = JSON.parse(localStorage.getItem('passworVal'));
    passVal = passVal?.filter((v) => v.code === 'MIN');
    let regMINStr = '(?=(.*[a-z]){' + passVal[0]?.valeur + '})';
    let regMin = new RegExp(regMINStr);
    if (regMin.test(c.value)) {
      return null;
    } else {
      return { minRegex: true };
    }
  }

  /**
   *
   * @param c
   * @returns
   */
  numRegexValidator(c: FormControl) {
    let passVal: any[] = JSON.parse(localStorage.getItem('passworVal'));
    var thenum = c.value.toString().replace(/\D/g, '')
    passVal = passVal?.filter((v) => v.code === 'C');
    console.log(thenum);

    if (thenum.length >= passVal[0]?.valeur) {
      return null;
    } else {
      return { numRegex: true };
    }
  }

  /**
   *
   * @param c
   * @returns
   */
  csRegexValidator(c: FormControl) {
    let passVal: any[] = JSON.parse(localStorage.getItem('passworVal'));
    passVal = passVal?.filter((v) => v.code === 'CS');
    let regSpeCharStr =
      '(?=.*[!"#$&\'()*+,-./:;?@[^_`,~]{' + passVal[0]?.valeur + '})';
    let regSpeChar = new RegExp(regSpeCharStr);
    //let regSpeChar = /(?=.*[!"#$&\'()*+,-./:;?@[^_`,~]{2})/;
    //let regSpeChar = /(?=(.*[!@#$%]){2})/;
    if (regSpeChar.test(c.value)) {
      return null;
    } else {
      return { csRegex: true };
    }
  }

  /**
   *
   * @param c
   * @returns
   */
  lenRegexValidator(c: FormControl) {
    let passVal: any[] = JSON.parse(localStorage.getItem('passworVal'));
    passVal = passVal?.filter((v) => v.code === 'CM');
    let regTotalStr = '.{' + passVal[0]?.valeur + ',}$';
    let regTotal = new RegExp(regTotalStr);
    //let regTotal = /.{9,}$/;
    if (regTotal.test(c.value)) {
      return null;
    } else {
      return { lenRegex: true };
    }
  }
}
