import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subject } from 'rxjs';
import { ParametrageModel } from '../model/ParametrageModel';
import { PasswordModel } from '../model/PasswordModel';
import { SnackBarNotifService } from '../service/snack-bar-notif.service';
import { messages } from '../Shared/utils/messages';
import { ParametrageService } from './parametrage.service';
import * as CryptoJS from 'crypto-js';



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
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
  imageUrl : string = "assets/img/pilposepic.jpeg";
  myForm!: FormGroup;
  res: ParametrageModel[];
  compare = false;
  checkPassword = false;
  hashedPassword  : string;
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
    
    private snackBarNotifService: SnackBarNotifService,

    private parametrageService: ParametrageService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<ChangePwdComponent>
  ) { }


  async ngOnInit() {
    this.passwordValidators = await this.loadParametrage();
    this.PasswordValidatorArr = this.passwordValidators;

    localStorage.setItem(
      'passworVal',
      JSON.stringify(this.PasswordValidatorArr)
    );

  

    this.maj = this.PasswordValidatorArr.filter(
      (v) => v.code === 'MAJ'
    )[0]?.valeur;
  
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

  logout() {
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('idUser');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('fonction');
    localStorage.removeItem('admin');
    this.route.navigate(['/login']);
  }


/*  hashPassword(password: string): string {
  
    this.hashedPassword = CryptoJS.SHA256(password).toString();

    return this.hashedPassword;
  }*/



  /**
   * Change le mot de passe en faisons appelle au service dédié
   */
  onSubmit() {
    this.newPass = {
      username: localStorage.getItem('currentUser'),
      oldPassword: this.myForm.value.ancienMdp,
      newPassword: this.myForm.value.nouveauMdp,
    };
    this.parametrageService.UpdatePassword(this.newPass).subscribe(
      (res) => {
        this.snackBarNotifService.openSnackBarSuccess(
          messages.password,



          this.translate.instant("Fermer")
        );

      this.logout();
        
        this.dialogRef.close(res);
      },

      (error) => {
        this.snackBarNotifService.openSnackBarFailure(
          messages.passwordEchoue,

          this.translate.instant("Fermer")
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
