import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAdminService } from '../login-admin/login-admin.service';


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
  constructor(private router: Router, private loginAdminService: LoginAdminService) {
  }

  ngOnInit() {


    if(localStorage.getItem('nom') != null && localStorage.getItem('prenom') != null ) {

      this.whiteColor = 'transitionContWhiteColor'
      this.animationClass = 'slideInUp'
      this.show = true
      this.slidedown()
      this.firstname = localStorage.getItem('nom') + " " +localStorage.getItem('prenom');
    
    }
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
      this.router.navigateByUrl("pilpose").then(() => {});
    
  }

  logout(){
    this.loginAdminService.logout();
  }
}
