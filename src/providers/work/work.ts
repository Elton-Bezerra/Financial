import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

/*
  Generated class for the WorkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WorkProvider {
  public basePath = "http://elekto.com.br/api/Calendars/br-BC/Delta?";

  public currentMonth = new Date();
  public nextMonth = new Date(new Date().setMonth(this.currentMonth.getMonth() + 1));
  public initialDate;
  public finalDate;

  constructor(public http: HttpClient) {
    this.calcularDatas();
  }

  getDaysInfo(dataInicio?, dataFim?) {
    return new Promise((resolve, reject) => {      
        this.http.get(this.basePath, {
          params: {
            initialDate: dataInicio ? dataInicio : this.initialDate,
            finalDate: dataFim ? dataFim : this.finalDate,
            type: dataFim ? 'whole' : 'financial'
          }
        }).map(res => res).subscribe(res => resolve(res));     
    });
  }

  calcularDatas() {
    this.calcularQuintoDiaUtil(this.currentMonth).then(
      (res: string) => {
        this.initialDate = new Date(res).toISOString();
      });
    this.calcularQuintoDiaUtil(this.nextMonth).then(
      (res: string) => {
        this.finalDate = new Date(res).toISOString();

      });
  }

  //retorna a data do quinto dia útil de determinada data
  calcularQuintoDiaUtil(data) {
    data.setDate(1);
    data = data.toISOString();
    let url = `http://elekto.com.br/api/Calendars/br-BC/Add?initialDate=${data}&days=5&finalAdjust=following`;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res) => resolve(res));
    });
  }

}
