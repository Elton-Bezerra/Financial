import { WorkProvider } from './../../providers/work/work';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public diasCorridos = 0;
  public diasUteis = 0;
  public hoje = new Date().toLocaleDateString();
  public despesas: any = {};

  constructor(
    public navCtrl: NavController,
    public workProvider: WorkProvider,
    private storage: Storage) {
      setTimeout( () => {
        this.workProvider.getDaysInfo().then((res: any) => {
          this.diasCorridos = res.ActualDays;
          this.diasUteis = res.WorkDays;
          this.calcularDespesas();
        });
      }, 2020 );
      
  }


  ionViewDidEnter() {
    this.calcularDespesas();
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
