import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  show: boolean = false;
  animationClass: string;
  whiteColor:string;
  firstname: string;
  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
     /* The transaction must be shown only on the first time */
     if(localStorage.getItem('showwelcomemsg') !== null) {
      this.whiteColor = 'transitionContWhiteColor'
      this.animationClass = 'slideInUp'
      this.show = true
      this.slidedown()
      localStorage.removeItem('showwelcomemsg')
      /* Getting name user from the token */
      this.firstname = JSON.parse(localStorage.currentUser).nom_complet;
    }

    //this.router.navigateByUrl("/welcome/home").then(() => {});

  }

  /**
   * attendez pour faire descendre le div
   */
  slidedown() {
    let that = this
    setTimeout(
      function() {
        that.animationClass = 'slideOutDown'
        that.whiteColor = ''
        that.hidewelcomeblock()
      }, 2000);
  }

  /**
   * attendez pour cachez le div
   */
  hidewelcomeblock() {
    let that = this
    setTimeout(
      function() {
        that.show = false
      }, 1100);
  }

  logout(){
    this.loginService.logout();
  }
}
