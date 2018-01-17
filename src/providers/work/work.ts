import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WorkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WorkProvider {
  public basePath = "http://elekto.com.br/api/Calendars/br-BC/Delta?type=whole";
  constructor(public http: HttpClient) {
    console.log('Hello WorkProvider Provider');
  }

  getMonthCosts(){
    let currentMonth = new Date()
    this.http.get(this.basePath, {
      params: {
        initialDate: '2018-01-09',
        finalDate: '2018-02-07'
      }
    }).subscribe(
      val => console.log(val)
    );
  }

}
