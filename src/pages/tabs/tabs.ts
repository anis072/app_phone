import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { FillPage } from '../fill/fill';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  rootPage:any = TabsPage;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = FillPage;
  tab4Root= LoginPage;



  constructor(public navCtrl: NavController,public authService:AuthProvider) {

  }
  myLogOut(){
    this.authService.logout();
    this.navCtrl.push(LoginPage);
  }
}
