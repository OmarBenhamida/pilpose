import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../Shared/utils/utils';
import { LoginService } from './login.service';
import { Constants } from './utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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

  /**
   *
   * @param formBuilder
   * @param router
   * @param loginService
   * @param translate
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private translate: TranslateService,


  ) {
    // verifier si l'application est en mode maintenance
    this.loginService.isMaintenance().subscribe((value) => {
      this.isMaintenance = value;
      // redirect to home if already logged in
      if (this.loginService.isLogged() && !this.isMaintenance) {
        this.router.navigate(['/ssm']);
      }
    });
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    //stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    /* login by username & password */
    this.loginService
      .authUser(this.f.username.value, "")
      .subscribe(() => {
        this.router.navigate(['/ssm']).then(() => {});
        this.show = true;
        localStorage.setItem('showwelcomemsg', '1');
      });
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
