import { WorkProvider } from './../../providers/work/work';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html'
})
export class ConsultaPage {
  public dataInicio;
  public dataFim;
  public diasUteis: any;
  public despesas: any = {
    transporte: undefined,
    refeicao: undefined
  };

  constructor(public navCtrl: NavController, public workProvider: WorkProvider, public storage: Storage, private datePicker: DatePicker) {}

  escolherData(data){
    
    this.datePicker.show({
      titleText: data == 0 ? 'Escolha a primeira data' : 'Escolha a segunda data',
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      locale: 'pt_BR'
    }).then(
      date => {    
        if(data == 0){
          this.dataInicio = date.toISOString().split('T')[0];
        } else {
          this.dataFim = date.toISOString().split('T')[0];
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  calcular() {
    this.workProvider.getDaysInfo(this.dataInicio, this.dataFim).then((res: any) => {
      this.diasUteis = res.WorkDays;
      this.storage.get('transporte').then((res) => {
        this.despesas.transporte = res * this.diasUteis;
      });
      this.storage.get('refeicao').then((res) => {
        this.despesas.refeicao = res * this.diasUteis;
      });
    });
  }
}