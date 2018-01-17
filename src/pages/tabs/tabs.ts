import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { ConsultaPage } from '../consulta/consulta';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConsultaPage;

  constructor() {

  }
}
