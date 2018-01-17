import { ConfigModalPage } from './../config-modal/config-modal';
import { WorkProvider } from './../../providers/work/work';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public diasCorridos;
  public diasUteis;
  public hoje = new Date().toLocaleDateString();
  constructor(public navCtrl: NavController, public workProvider: WorkProvider, public modalCtrl: ModalController) {
      setTimeout(() => {
        this.workProvider.getMonthCosts().then((res: any) => {
          this.diasCorridos = res.ActualDays;
          this.diasUteis = res.WorkDays;
          console.log(this.diasCorridos);
        });
      }, 2000);  
  }

  openModal(){
    let modal = this.modalCtrl.create(ConfigModalPage);
    modal.present();
  }

}
