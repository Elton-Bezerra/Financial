import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { App } from 'ionic-angular/components/app/app';

/**
 * Generated class for the ConfigModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config-modal',
  templateUrl: 'config-modal.html',
})
export class ConfigModalPage {
  public precos: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    private storage: Storage,
    private toastCtrl: ToastController,
    public appCtrl: App) {
    storage.get('transporte').then((res) => {
      this.precos.transporte = res;
    });
    storage.get('refeicao').then((res) => {
      this.precos.refeicao = res;
    });
  }

  ionViewDidEnter() {   
    this.getConfigs();
  }

  salvarConfigs() {
    this.storage.set('transporte', this.precos.transporte.replace(/,/g, '.'));
    this.storage.set('refeicao', this.precos.refeicao.replace(/,/g, '.'));
    this.presentToast('Suas configurações foram atualizadas!');
  }

  getConfigs(){  
    this.storage.get('transporte').then((val) => { 
      this.precos.transporte = val;      
    });
    this.storage.get('refeicao').then((val) => {
      this.precos.refeicao = val;      
    });        
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();        
  }

}
