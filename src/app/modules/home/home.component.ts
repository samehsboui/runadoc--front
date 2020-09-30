import { Component, OnInit } from '@angular/core';
import { Settings, AppSettings } from '../../app.settings';
import { MediaObserver } from '@angular/flex-layout';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public homeTitle: string;
  public settings: Settings;

  constructor(public appSettings: AppSettings,
              public mediaObserver: MediaObserver,
              private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateHeader();
    });
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.translateHeader();
  }

  translateHeader() {
    this.translateService.get('home.header.title').subscribe(res => {
      this.homeTitle = res;
    });
  }

}
