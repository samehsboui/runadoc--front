import { Component, OnInit, ViewChild, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { JwtResponse } from 'src/app/core/models/responses/jwt-response';
import { CommonService } from 'src/app/core/services/common.service';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit {

  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation: true
  };
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen = true;
  public links = [
    { i18nKey: 'editProfile', name: '', href: 'profile', icon: 'edit' },
    { i18nKey: 'myReservation', name: '', href: 'my-reservations', icon: 'list' },
    { i18nKey: 'profile.updatePassword', name: '', href: 'update-password', icon: 'lock' }
  ];
  private currentUser: JwtResponse;
  constructor(public router: Router, private authService: AuthService, private commonService: CommonService,
              private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getMenuItems();
    });
   }

  ngOnInit() {
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    this.getMenuItems();
    this.commonService.getCurrentUser().subscribe(x => {
      this.currentUser =  x;
    });
  }
  getMenuItems() {
    this.links.forEach(item => {
      this.translateService.get(item.i18nKey).subscribe(res => {
        item.name = res;
      });
    });
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth < 960) {
          this.sidenav.close();
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
