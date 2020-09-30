import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  public frenchFlag = 'assets/images/flags/fr.svg';
  public englishFlag = 'assets/images/flags/gb.svg' ;

  constructor(private translate: TranslateService) {
    if (translate.currentLang === undefined) {
      translate.setDefaultLang('fr');
      translate.use('fr');
    }
  }

  ngOnInit() {
  }

  public changeLanguage(language) {
    this.translate.use(language);
  }

}
