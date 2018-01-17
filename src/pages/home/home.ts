import { WorkProvider } from './../../providers/work/work';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public workProvider: WorkProvider) {
    this.workProvider.getMonthCosts();
  }

}
