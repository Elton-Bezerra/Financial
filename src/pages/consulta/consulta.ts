import { WorkProvider } from './../../providers/work/work';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';

@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html'
})
export class ConsultaPage {
  public dataInicio;
  public dataFim;
  public despesas: any = {
    transporte: undefined,
    refeicao: undefined
  };

  constructor(public navCtrl: NavController, public workProvider: WorkProvider, public storage: Storage) {}

  calcular() {
    this.workProvider.getMonthCosts(this.dataInicio, this.dataFim).then((res: any) => {
      let diasUteis = res.WorkDays;
      this.storage.get('transporte').then((res) => {
        this.despesas.transporte = res * diasUteis;
      });
      this.storage.get('refeicao').then((res) => {
        this.despesas.refeicao = res * diasUteis;
      });
    });
  }
}