import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { ConsultaPage } from '../consulta/consulta';
import { ConfigModalPage } from '../config-modal/config-modal';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConsultaPage;
  tab3Root = ConfigModalPage
  constructor() {

  }
}
