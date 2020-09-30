import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public toolbarTypes = [1, 2];
  public toolbarTypeOption: number;
  public headerTypes = ['default', 'image', 'carousel'];
  public headerTypeOption: string;
  public searchPanelVariants = [1, 2, 3];
  public searchPanelVariantOption: number;
  public headerFixed = false;
  public showBackToTop = false;
  public scrolledCount = 0;

  public settings: Settings;
  constructor(public appSettings: AppSettings, public router: Router) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.toolbarTypeOption = this.settings.toolbar;
    this.headerTypeOption = this.settings.header;
    this.searchPanelVariantOption = this.settings.searchPanelVariant;
  }

  public changeTheme(theme) {
    this.settings.theme = theme;
  }

  public chooseToolbarType() {
    this.settings.toolbar = this.toolbarTypeOption;
    window.scrollTo(0, 0);
  }

  public chooseHeaderType() {
    this.settings.header = this.headerTypeOption;
    window.scrollTo(0, 0);
    this.router.navigate(['/']);
  }

  public chooseSearchPanelVariant() {
    this.settings.searchPanelVariant = this.searchPanelVariantOption;
  }


  @HostListener('window:scroll') onWindowScroll() {
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    (scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;

    if (this.settings.stickyMenuToolbar) {
      const topToolbar = document.getElementById('top-toolbar');
      if (topToolbar) {
        if (scrollTop >= topToolbar.clientHeight) {
          this.settings.mainToolbarFixed = true;
        } else {
          this.settings.mainToolbarFixed = false;
        }
      }
    }

    const loadMore = document.getElementById('load-more');
    if (loadMore) {
      if (window.innerHeight > loadMore.getBoundingClientRect().top + 120) {
        if (!this.settings.loadMore.complete) {
          if (this.settings.loadMore.start) {
            if (this.scrolledCount < this.settings.loadMore.step) {
              this.scrolledCount++;
              if (!this.settings.loadMore.load) {
                this.settings.loadMore.load = true;
              }
            } else {
              this.settings.loadMore.start = false;
              this.scrolledCount = 0;
            }
          }
        }
      }
    }
  }

  public scrollToTop() {
    const scrollDuration = 200;
    const scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    const scrollInterval = setInterval(() => {
      if (window.pageYOffset !== 0) {
         window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => { window.scrollTo(0, 0); });
    }
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
        this.settings.mainToolbarFixed = false;
        setTimeout(() => {
          window.scrollTo(0, 0);
        });
      }
    });
  }


}
