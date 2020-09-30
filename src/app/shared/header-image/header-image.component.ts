import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Settings, AppSettings } from '../../app.settings';

@Component({
  selector: 'app-header-image',
  templateUrl: './header-image.component.html',
  styleUrls: ['./header-image.component.scss']
})
export class HeaderImageComponent implements OnInit, OnDestroy {
  @Input('backgroundImage') backgroundImage;
  @Input('bgImageAnimate') bgImageAnimate;
  @Input('contentOffsetToTop') contentOffsetToTop;
  @Input('contentMinHeight') contentMinHeight;
  @Input('title') title;
  @Input('desc') desc;
  @Input('isHomePage') isHomePage = false;
  public bgImage;
  public settings: Settings;
  constructor(public appSettings: AppSettings, private sanitizer: DomSanitizer) {
    this.settings = this.appSettings.settings;
    this.settings.headerBgImage = true;
  }

  ngOnInit() {
    if (this.contentOffsetToTop) {
      this.settings.contentOffsetToTop = this.contentOffsetToTop;
    }
    if (this.backgroundImage) {
      this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(' + this.backgroundImage + ')');
    }
  }

  ngOnDestroy() {
    this.settings.headerBgImage = false;
    this.settings.contentOffsetToTop = false;
  }

}
