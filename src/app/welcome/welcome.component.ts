import { JwtService } from './../Shared/utils/jwt.service';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { LoginService } from '../login/login.service';
import { Constants } from '../login/utils/constants';
import { Utils } from '../Shared/utils/utils';
import { SofappsHomeService } from './sofapps-home/sofapps-home.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [MatExpansionPanel],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  fullName = JSON.parse(localStorage.getItem('currentUser'))?.nom_complet;
  @Input() profilePict: string = null;
  isSideNavbarOpen: boolean;
  mode: string;
  hasBackdrop: boolean;

  version: string;
  menuOpen: boolean = false;
  dateMiseAjour: string;
  role: string;
  languages = [
    { id: 1, libelle: 'Francais', code: 'fr' },
    { id: 2, libelle: 'English', code: 'en' },
  ];
  currentLang: any;
  private subscription: Subscription;
  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private sofappsHomeService: SofappsHomeService,
    private jwtService: JwtService
  ) {
    this.isSideNavbarOpen = true;
    if (window.innerWidth <= 768) {
      this.mode = 'over';
      this.hasBackdrop = true;
    } else {
      this.mode = 'side';
      this.hasBackdrop = false;
    }
  }

  ngOnInit() {
    let jwtToken = JSON.parse(localStorage.getItem('currentUser'))?.token_dto
      ?.token;
    let decoded = this.jwtService.getTokenDecoded(jwtToken);
    this.role = decoded.roles;
    this.initLang();
    if (this.fullName == null || this.fullName == undefined) {
      this.subscription = this.sofappsHomeService
        .getFullNameSubjectAsObsrv()
        .subscribe((res) => {
          this.fullName = res;
        });
    }
    // this.sirhusMenuService.setIdModuleSubject(
    //   JSON.parse(localStorage.getItem('currentModule'))
    // );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /** message de déconnexion */
  logout() {
    const dialogDecnx = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Déconnexion',
        message: 'Voulez-vous vraiment quitter SofPass ?',
        buttonText: {
          ok: 'Oui',
          cancel: 'Non',
        },
      },
      panelClass: 'confirmation-popup',
    });
    dialogDecnx.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.loginService.logout();
      }
    });
  }

  toggleSideNavbar() {
    this.isSideNavbarOpen = !this.isSideNavbarOpen;
  }

  closeMobileSideNavbar() {
    if (window.innerWidth <= 768) this.isSideNavbarOpen = false;
  }

  /* change sidenavbar mode & backdrop for small  devices */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 768) {
      this.hasBackdrop = true;
      this.mode = 'over';
    } else {
      this.hasBackdrop = false;
      this.mode = 'side';
      this.isSideNavbarOpen = true;
    }
  }

  togglemenuOpen() {
    this.menuOpen = !this.menuOpen;
    this.isSideNavbarOpen = this.menuOpen;
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
