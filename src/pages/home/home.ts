import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import {add} from '../add/add';
import { ComplaintProvider} from '../../providers/complaint/complaint';
import {FillPage} from '../fill/fill'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   myComplain:any
  constructor(public navCtrl: NavController, public complaint :ComplaintProvider) {
    this.complaint.Complain().then((data)=>{
   // console.log(JSON.stringify(data))
      this.myComplain=data["complain"];
     })

  }
  fillPage(){
    this.navCtrl.push(FillPage)
  }

}
