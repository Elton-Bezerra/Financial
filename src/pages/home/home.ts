import { ConfigModalPage } from './../config-modal/config-modal';
import { WorkProvider } from './../../providers/work/work';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Storage } from '@ionic/storage/dist/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public diasCorridos;
  public diasUteis;
  public hoje = new Date().toLocaleDateString();
  public despesas: any = {};

  constructor(
    public navCtrl: NavController,
    public workProvider: WorkProvider,
    public modalCtrl: ModalController,
    private storage: Storage) {
    setTimeout(() => {
      this.workProvider.getMonthCosts().then((res: any) => {
        this.diasCorridos = res.ActualDays;
        this.diasUteis = res.WorkDays;
        this.calcularDespesas();
      });
    }, 2000);
  }

  openModal() {
    let modal = this.modalCtrl.create(ConfigModalPage);
    modal.present();
  }


  calcularDespesas() {
    this.storage.get('transporte').then((res) => {
      this.despesas.transporte = res * this.diasUteis;
    });
    this.storage.get('refeicao').then((res) => {
      this.despesas.refeicao = res * this.diasUteis;
    });
  }



}
