import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../Shared/utils/utils';
import { LoginAdminService } from './login-admin.service';
import { Constants } from './utils/constants';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPwdComponent } from '../forgot-pwd/forgot-pwd.component';
import { UserModel } from './model/user.model';
import { SnackBarNotifService } from '../service/snack-bar-notif.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  show = false;
  hide: boolean = true;
  isMaintenance: any = false;
  languages = [
    { id: 1, libelle: 'Francais', code: 'fr' },
    { id: 2, libelle: 'English', code: 'en' },
  ];
  currentLang: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginAdminService,
    private snackBarNotifService: SnackBarNotifService,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initLang();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(ForgotPwdComponent, {
      width: '750px',
      height: '60vh', // Adjust width as needed
      // Other configuration options like height, data, etc.
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }

  onSubmit() {
    this.submitted = true;


    console.warn(this.loginForm.invalid);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      // return;
    } else {


      let user: UserModel = {
        username: this.f.username.value,
        password: this.f.password.value,
        email: '',
        dateCreation: '',
      };

      this.loginService.authUser(user).then((res) => {

        localStorage.setItem('nom',res.nom );
        localStorage.setItem('prenom',res.prenom );
        localStorage.setItem('idUser',res.idUser );
        localStorage.setItem('currentUser',res.username );
        localStorage.setItem('fonction',res.fonction );
        localStorage.setItem('admin',res.admin );
        this.router.navigate(['/modules']).then(() => {});
        this.show = true;
        localStorage.setItem('showwelcomemsg', '1');
      }).catch((err) => {
        if (err.status == 404) {
          this.snackBarNotifService.openSnackBarFailure(
            'Nom d utilisateur ou mot de passe incorect',

            this.translate.instant('Fermer')
          );
        } else {
          this.snackBarNotifService.openSnackBarFailure(
            'Erreur lors de l authentification',

            this.translate.instant('Fermer')
          );
        }
      });


      ;
    }
  }

  /* change current language */
  changeLang(code) {
    this.translate.use(code);
    this.currentLang = this.languages.find((lang) => lang.code === code);
    localStorage.setItem('lang', JSON.stringify(this.currentLang));
  }

  /* initialize the language */
  initLang() {
    /* get liste of languages from localStrorage if exist else from back */
    if (localStorage.getItem('langList')) {
      this.languages = JSON.parse(localStorage.getItem('langList'));
    } else {
      /* store languages list */
      localStorage.setItem('langList', JSON.stringify(this.languages));
    }

    /* get stored language */
    let langStorage = JSON.parse(localStorage.getItem('lang'));

    /* set stored lang as current lang */
    if (!Utils.isNullOrUndefined(langStorage)) {
      this.translate.setDefaultLang(langStorage.code);
      this.translate.use(langStorage.code);
      this.currentLang = langStorage;
    } else {
      /* set default lang as current lang */
      this.translate.setDefaultLang(Constants.DEFAULT_LANG);
      this.translate.use(Constants.DEFAULT_LANG);
      langStorage = this.languages.find(
        (lang) => lang.code === Constants.DEFAULT_LANG
      );

      /* store current lang */
      localStorage.setItem('lang', JSON.stringify(langStorage));
      this.currentLang = langStorage;
    }
  }
}
